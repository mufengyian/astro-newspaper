import type { APIRoute } from "astro";
import { hasPublicSiteUrl, siteConfig } from "../config";
import { withBase } from "../utils/routing";

export const GET: APIRoute = () => {
	if (!hasPublicSiteUrl()) {
		return new Response("User-agent: *\nDisallow: /\n", {
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		});
	}

	return new Response(
		`User-agent: *\nAllow: /\nSitemap: ${new URL(withBase("sitemap-index.xml"), siteConfig.siteUrl).href}\n`,
		{
			headers: {
				"Content-Type": "text/plain; charset=utf-8",
			},
		},
	);
};
