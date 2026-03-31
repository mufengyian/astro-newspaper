import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { hasPublicSiteUrl, siteConfig } from "../config";
import { getDictionary } from "../utils/i18n";
import { getPostPermalink, getSortedPosts } from "../utils/posts";
import { withBase } from "../utils/routing";

const locale = "zh-cn" as const;
const dictionary = getDictionary(locale);

function escapeXml(value: string) {
	return value
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function buildUnavailableFeed(message: string) {
	return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <description>${escapeXml(message)}</description>
    <link>${escapeXml(withBase("rss"))}</link>
  </channel>
</rss>`;
}

export async function GET() {
	if (!hasPublicSiteUrl()) {
		return new Response(buildUnavailableFeed("RSS 订阅暂不可用，请先配置公开站点地址。"), {
			headers: {
				"Content-Type": "application/rss+xml; charset=utf-8",
			},
		});
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
