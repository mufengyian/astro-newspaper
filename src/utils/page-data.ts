import rss from "@astrojs/rss";
import type { APIRoute, GetStaticPaths } from "astro";
import { hasPublicSiteUrl, siteConfig } from "../config";
import { formatDate } from "./date";
import { DEFAULT_LOCALE, getDictionary, type SiteLocale } from "./i18n";
import {
	getHomePermalink,
	getLocalizedPath,
	getRssPagePermalink,
} from "./routing";
import {
	getAllPosts,
	getHomePosts,
	getPageItems,
	getPostPermalink,
	getPostsByTag,
	getReadingMinutes,
	getSortedPosts,
	getTagIndex,
	getTotalPages,
	groupPostsByYear,
	stripMarkdown,
	type PostEntry,
} from "./posts";

export type PaginatedPostFeedProps = {
	currentPage: number;
	totalPages: number;
	pagePosts: PostEntry[];
};

export type TagPageProps = {
	tagName: string;
	posts: PostEntry[];
};

export type PostRouteProps = {
	post: PostEntry;
	posts: PostEntry[];
};

function escapeXml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

async function getLocalePosts(locale: SiteLocale) {
	return getSortedPosts(await getAllPosts(), locale);
}

export function getPostFeedRouteConfig(locale: SiteLocale) {
	return {
		firstPageUrl: getHomePermalink(locale),
		pageUrlPattern: getLocalizedPath(locale, "page/{page}"),
	};
}

export async function getHomePageData(locale: SiteLocale) {
	const posts = await getLocalePosts(locale);
	const homePosts = getHomePosts(posts, siteConfig.featuredCount);
	const totalPages = getTotalPages(homePosts.length, siteConfig.postsPerPage);

	return {
		pagePosts: getPageItems(homePosts, 1, siteConfig.postsPerPage),
		totalPages,
	};
}

export async function getArchivePageData(locale: SiteLocale) {
	const posts = await getLocalePosts(locale);
	return {
		groupedPosts: groupPostsByYear(posts),
	};
}

export async function getTagIndexPageData(locale: SiteLocale) {
	const posts = await getLocalePosts(locale);
	return {
		tagIndex: getTagIndex(posts),
	};
}

export async function getSearchIndexPayload(locale: SiteLocale) {
	const dictionary = getDictionary(locale);
	const posts = await getLocalePosts(locale);

	return posts.map((post) => ({
		title: post.data.title,
		excerpt: post.data.excerpt,
		category: post.data.category ?? "",
		tags: post.data.tags,
		url: getPostPermalink(locale, post),
		publishedLabel: formatDate(post.data.publishDate, locale),
		readingMinutesLabel: dictionary.reading.minutes(getReadingMinutes(post)),
		body: stripMarkdown(post.body ?? ""),
	}));
}

function buildUnavailableFeed(message: string, link: string) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(message)}</description>
    <link>${escapeXml(link)}</link>
  </channel>
</rss>`;
}

export function createPaginatedFeedStaticPaths(locale: SiteLocale): GetStaticPaths {
	return async () => {
		const posts = getHomePosts(await getLocalePosts(locale), siteConfig.featuredCount);
		const totalPages = getTotalPages(posts.length, siteConfig.postsPerPage);

		return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
			const currentPage = index + 2;
			return {
				params: { page: String(currentPage) },
				props: {
					currentPage,
					totalPages,
					pagePosts: getPageItems(posts, currentPage, siteConfig.postsPerPage),
				} satisfies PaginatedPostFeedProps,
			};
		});
	};
}

export function createTagStaticPaths(locale: SiteLocale): GetStaticPaths {
	return async () => {
		const posts = await getLocalePosts(locale);

		return getTagIndex(posts).map((tag) => ({
			params: { tag: tag.slug },
			props: {
				tagName: tag.name,
				posts: getPostsByTag(posts, tag.slug),
			} satisfies TagPageProps,
		}));
	};
}

export function createPostStaticPaths(locale: SiteLocale): GetStaticPaths {
	return async () => {
		const posts = await getLocalePosts(locale);

		return posts.map((post) => ({
			params: { slug: post.id },
			props: {
				post,
				posts,
			} satisfies PostRouteProps,
		}));
	};
}

export function createSearchIndexRoute(locale: SiteLocale): APIRoute {
	return async () => {
		const payload = await getSearchIndexPayload(locale);

		return new Response(JSON.stringify(payload), {
			headers: {
				"Content-Type": "application/json; charset=utf-8",
				"Cache-Control": "public, max-age=3600",
			},
		});
	};
}

export function createRssRoute(locale: SiteLocale): APIRoute {
	return async () => {
		const dictionary = getDictionary(locale);

		if (!hasPublicSiteUrl()) {
			return new Response(
				buildUnavailableFeed(
					dictionary.rss.unavailableFeedMessage,
					getRssPagePermalink(locale),
				),
				{
					headers: {
						"Content-Type": "application/rss+xml; charset=utf-8",
					},
				},
			);
		}

		const posts = await getLocalePosts(locale);

		return rss({
			title:
				locale === DEFAULT_LOCALE
					? siteConfig.title
					: `${siteConfig.title} (${dictionary.langName})`,
			description: dictionary.site.description,
			site: siteConfig.siteUrl,
			items: posts.map((post) => ({
				title: post.data.title,
				description: post.data.excerpt,
				pubDate: post.data.publishDate,
				link: getPostPermalink(locale, post),
				categories: post.data.tags,
			})),
			customData: `<language>${locale}</language>`,
		});
	};
}
