import type { APIRoute } from "astro";
import { siteConfig } from "../config";
import { getSearchIndexPayload } from "../utils/page-data";

const locale = "zh-cn" as const;

export const GET: APIRoute = async () => {
	return new Response(JSON.stringify(await getSearchIndexPayload(locale)), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": `public, max-age=${siteConfig.search.cacheMaxAge}`,
		},
	});
};
