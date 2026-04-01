import { getCollection, type CollectionEntry } from "astro:content";
import readingTime from "reading-time";
import { DEFAULT_LOCALE, type SiteLocale } from "./i18n";
import { getLocalizedPath } from "./routing";

export type PostEntry = CollectionEntry<"posts">;

export type TagSummary = {
	name: string;
	slug: string;
	count: number;
};

const tagSymbolTokens: Record<string, string> = {
	"#": "sharp",
	"+": "plus",
	".": "dot",
	"&": "and",
	"@": "at",
};

let allPostsPromise: Promise<PostEntry[]> | undefined;

function getTranslationKey(post: PostEntry) {
	return post.data.translationKey?.trim() || post.id;
}

function sortPosts(posts: PostEntry[]) {
	return [...posts].sort(
		(a, b) =>
			b.data.publishDate.valueOf() - a.data.publishDate.valueOf() ||
			a.data.title.localeCompare(b.data.title, "zh-CN"),
	);
}

export async function getAllPosts() {
	if (!allPostsPromise) {
		allPostsPromise = getCollection("posts");
	}

	return allPostsPromise;
}

export function slugifyTag(tag: string) {
	const normalized = tag.trim().toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
	let slug = "";

	for (const character of normalized) {
		if (/[a-z0-9\u4e00-\u9fa5]/.test(character)) {
			slug += character;
			continue;
		}

		if (/\s|-|_/.test(character)) {
			slug += "-";
			continue;
		}

		if (character in tagSymbolTokens) {
			slug += `-${tagSymbolTokens[character]}-`;
			continue;
		}

		const codePoint = character.codePointAt(0)?.toString(16);
		slug += codePoint ? `-u${codePoint}-` : "-";
	}

	return slug.replace(/-+/g, "-").replace(/^-|-$/g, "") || "tag";
}

export function stripMarkdown(source: string) {
	return source
		.replace(/```[\s\S]*?```/g, " ")
		.replace(/`[^`]*`/g, " ")
		.replace(/!\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/\[[^\]]*]\([^)]*\)/g, " ")
		.replace(/^>+/gm, " ")
		.replace(/[#*_~>-]/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

export function isVisiblePost(post: PostEntry) {
	return import.meta.env.DEV || !post.data.draft;
}

export function getLocalizedPosts(posts: PostEntry[], locale: SiteLocale = DEFAULT_LOCALE) {
	const visiblePosts = posts.filter(isVisiblePost);
	return visiblePosts.filter((post) => post.data.locale === locale);
}

export function getSortedPosts(posts: PostEntry[], locale: SiteLocale = DEFAULT_LOCALE) {
	return sortPosts(getLocalizedPosts(posts, locale));
}

export function getHomePosts(posts: PostEntry[], featuredCount = 3) {
	const sortedPosts = sortPosts(posts);
	const featuredPosts = sortedPosts.filter((post) => post.data.featured).slice(0, featuredCount);
	const featuredIds = new Set(featuredPosts.map((post) => post.id));
	return [...featuredPosts, ...sortedPosts.filter((post) => !featuredIds.has(post.id))];
}

export function getPageItems<T>(items: T[], currentPage: number, pageSize: number) {
	const start = Math.max(0, (currentPage - 1) * pageSize);
	return items.slice(start, start + pageSize);
}

export function getTotalPages(totalItems: number, pageSize: number) {
	return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function getReadingMinutes(post: PostEntry) {
	return Math.max(1, Math.round(readingTime(post.body ?? "").minutes));
}

export function getPostPermalink(locale: SiteLocale, post: Pick<PostEntry, "id">) {
	return getLocalizedPath(locale, `posts/${post.id}`);
}

export function getTagPermalink(locale: SiteLocale, tag: string) {
	return getTagPermalinkBySlug(locale, slugifyTag(tag));
}

export function getTagPermalinkBySlug(locale: SiteLocale, tagSlug: string) {
	return getLocalizedPath(locale, `tags/${tagSlug}`);
}

export function getTagIndex(posts: PostEntry[]) {
	const counts = new Map<string, TagSummary>();

	for (const post of sortPosts(posts)) {
		for (const tag of post.data.tags) {
			const slug = slugifyTag(tag);
			const current = counts.get(slug);
			if (current) {
				current.count += 1;
			} else {
				counts.set(slug, { name: tag, slug, count: 1 });
			}
		}
	}

	return Array.from(counts.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "zh-CN"));
}

export function getPostsByTag(posts: PostEntry[], tagSlug: string) {
	return sortPosts(posts).filter((post) => post.data.tags.some((tag) => slugifyTag(tag) === tagSlug));
}

export function groupPostsByYear(posts: PostEntry[]) {
	const groups = new Map<number, PostEntry[]>();
	for (const post of sortPosts(posts)) {
		const year = post.data.publishDate.getFullYear();
		const bucket = groups.get(year) ?? [];
		bucket.push(post);
		groups.set(year, bucket);
	}

	return Array.from(groups.entries()).sort((a, b) => b[0] - a[0]);
}

export function getAdjacentPosts(current: PostEntry, posts: PostEntry[]) {
	const sortedPosts = sortPosts(posts);
	const index = sortedPosts.findIndex((post) => post.id === current.id);
	return {
		newerPost: index > 0 ? sortedPosts[index - 1] : undefined,
		olderPost: index >= 0 && index < sortedPosts.length - 1 ? sortedPosts[index + 1] : undefined,
	};
}

export function getRelatedPosts(current: PostEntry, posts: PostEntry[], limit = 3) {
	const currentTags = new Set(current.data.tags.map(slugifyTag));
	const currentCategory = current.data.category;
	const currentKey = getTranslationKey(current);

	return sortPosts(posts)
		.filter((post) => post.id !== current.id && getTranslationKey(post) !== currentKey)
		.map((post) => {
			const sharedTags = post.data.tags.reduce((score, tag) => {
				return score + (currentTags.has(slugifyTag(tag)) ? 4 : 0);
			}, 0);
			const sameCategory = currentCategory && post.data.category === currentCategory ? 2 : 0;
			return {
				post,
				score: sharedTags + sameCategory,
			};
		})
		.filter((item) => item.score > 0)
		.sort(
			(a, b) =>
				b.score - a.score ||
				b.post.data.publishDate.valueOf() - a.post.data.publishDate.valueOf(),
		)
		.slice(0, limit)
		.map((item) => item.post);
}
