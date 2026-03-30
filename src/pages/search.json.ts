import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { formatDate } from "../utils/date";
import { getDictionary } from "../utils/i18n";
import { getReadingMinutes, getSortedPosts, getPostPermalink, stripMarkdown } from "../utils/posts";

const locale = "zh-cn" as const;
const dictionary = getDictionary(locale);

export const GET: APIRoute = async () => {
	const posts = getSortedPosts(await getCollection("posts"), locale);
	const payload = posts.map((post) => ({
		title: post.data.title,
		excerpt: post.data.excerpt,
		category: post.data.category ?? "",
		tags: post.data.tags,
		url: getPostPermalink(locale, post),
		published: post.data.publishDate.toISOString(),
		publishedLabel: formatDate(post.data.publishDate, locale),
		readingMinutesLabel: dictionary.reading.minutes(getReadingMinutes(post)),
		body: stripMarkdown(post.body ?? ""),
	}));

	return new Response(JSON.stringify(payload), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
