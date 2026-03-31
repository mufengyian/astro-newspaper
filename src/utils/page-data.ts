import { siteConfig } from "../config";
import { formatDate } from "./date";
import { getDictionary, type SiteLocale } from "./i18n";
import {
	getAdjacentPosts,
	getHomePosts,
	getPageItems,
	getPostPermalink,
	getPostsByTag,
	getReadingMinutes,
	getRelatedPosts,
	getTagIndex,
	getTotalPages,
	getSortedPosts,
	groupPostsByYear,
	loadLocalizedPosts,
	stripMarkdown,
	type PostEntry,
} from "./posts";

type PaginationPathProps = {
	currentPage: number;
	totalPages: number;
	pagePosts: PostEntry[];
};

type TagPathProps = {
	tagName: string;
	posts: PostEntry[];
};

type PostPathProps = {
	post: PostEntry;
	posts: PostEntry[];
};

export async function getHomePageData(locale: SiteLocale, currentPage = 1) {
	const localizedPosts = await loadLocalizedPosts(locale);
	const orderedPosts = getHomePosts(localizedPosts, siteConfig.posts.featuredCount);
	const totalPages = getTotalPages(orderedPosts.length, siteConfig.posts.perPage);
	const pagePosts = getPageItems(orderedPosts, currentPage, siteConfig.posts.perPage);

	return {
		posts: localizedPosts,
		orderedPosts,
		pagePosts,
		totalPages,
		currentPage,
	};
}

export async function getArchivePageData(locale: SiteLocale) {
	const posts = await loadLocalizedPosts(locale);
	return {
		posts,
		groupedPosts: groupPostsByYear(posts),
	};
}

export async function getTagIndexPageData(locale: SiteLocale) {
	const posts = await loadLocalizedPosts(locale);
	return {
		posts,
		tagIndex: getTagIndex(posts),
	};
}

export async function getPaginationStaticPaths(locale: SiteLocale) {
	const { orderedPosts, totalPages } = await getHomePageData(locale);

	return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => {
		const currentPage = index + 2;
		return {
			params: { page: String(currentPage) },
			props: {
				currentPage,
				totalPages,
				pagePosts: getPageItems(orderedPosts, currentPage, siteConfig.posts.perPage),
			} satisfies PaginationPathProps,
		};
	});
}

export async function getTagStaticPaths(locale: SiteLocale) {
	const posts = await loadLocalizedPosts(locale);
	return getTagIndex(posts).map((tag) => ({
		params: { tag: tag.slug },
		props: {
			tagName: tag.name,
			posts: getPostsByTag(posts, tag.slug),
		} satisfies TagPathProps,
	}));
}

export async function getPostStaticPaths(locale: SiteLocale) {
	const posts = await loadLocalizedPosts(locale);

	return posts.map((post) => ({
		params: { slug: post.id },
		props: {
			post,
			posts,
		} satisfies PostPathProps,
	}));
}

export async function getPostPageData(post: PostEntry, posts: PostEntry[]) {
	return {
		relatedPosts: getRelatedPosts(post, posts, siteConfig.posts.relatedCount),
		...getAdjacentPosts(post, posts),
	};
}

export async function getSearchIndexPayload(locale: SiteLocale) {
	const dictionary = getDictionary(locale);
	const posts = await loadLocalizedPosts(locale);

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

export async function getRssPosts(locale: SiteLocale) {
	return getSortedPosts(await loadLocalizedPosts(locale), locale);
}
