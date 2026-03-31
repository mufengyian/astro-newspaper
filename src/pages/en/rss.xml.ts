import rss from "@astrojs/rss";
import { hasPublicSiteUrl, siteConfig } from "../../config";
import { getDictionary } from "../../utils/i18n";
import { getRssPosts } from "../../utils/page-data";
import { getPostPermalink, type PostEntry } from "../../utils/posts";
import { withBase } from "../../utils/routing";

const locale = "en" as const;
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
    <link>${escapeXml(withBase(`en/${siteConfig.routes.rss}`))}</link>
  </channel>
</rss>`;
}

function buildItems(posts: PostEntry[]) {
	return posts.map((post) => ({
		title: post.data.title,
		description: post.data.excerpt,
		pubDate: post.data.publishDate,
		link: getPostPermalink(locale, post),
		categories: post.data.tags,
	}));
}

export async function GET() {
	if (!hasPublicSiteUrl()) {
		return new Response(buildUnavailableFeed(dictionary.rss.unavailableFeed), {
			headers: {
				"Content-Type": "application/rss+xml; charset=utf-8",
			},
		});
	}

	return rss({
		title: `${siteConfig.title} (${dictionary.langName})`,
		description: dictionary.site.description,
		site: siteConfig.siteUrl,
		items: buildItems(await getRssPosts(locale)),
		customData: `<language>${locale}</language>`,
	});
}
