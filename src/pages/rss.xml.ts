import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { hasPublicSiteUrl, siteConfig } from "../config";
import { getDictionary } from "../utils/i18n";
import { getPostPermalink, getSortedPosts } from "../utils/posts";

const locale = "zh-cn" as const;
const dictionary = getDictionary(locale);

export async function GET() {
	if (!hasPublicSiteUrl()) {
		return new Response(null, { status: 204 });
	}

	const posts = getSortedPosts(await getCollection("posts"), locale);

	return rss({
		title: siteConfig.title,
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
}
