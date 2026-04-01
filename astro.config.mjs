// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkGfm from "remark-gfm";

const site = process.env.PUBLIC_SITE_URL?.trim();
const hasSite = Boolean(site);
const siteUrl = hasSite ? site : undefined;
const base = siteUrl ? new URL(siteUrl).pathname.replace(/\/$/, "") || "/" : "/";

// https://astro.build/config
export default defineConfig({
	...(siteUrl ? { site: siteUrl, ...(base !== "/" ? { base } : {}) } : {}),
	integrations: [mdx(), ...(hasSite ? [sitemap()] : [])],
	i18n: {
		locales: ["zh-cn", "en"],
		defaultLocale: "zh-cn",
		routing: {
			prefixDefaultLocale: false,
		},
	},
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	markdown: {
		remarkPlugins: [remarkGfm],
		shikiConfig: {
			themes: {
				light: "github-light",
				dark: "github-dark",
			},
			wrap: true,
		},
	},
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
		layout: "constrained",
		responsiveStyles: true,
	},
	scopedStyleStrategy: "where",
});
