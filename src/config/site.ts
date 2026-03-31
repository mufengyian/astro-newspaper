import { DEFAULT_LOCALE, LOCALES } from "../utils/i18n";

export type SocialPlatform = "GitHub" | "X" | "LinkedIn" | "Email";
export type TypographyPreset = "editorial" | "wenkai";

export type SocialLink = {
	label: SocialPlatform;
	href: string;
};

const publicSiteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "").trim();
const walineServerURL = (import.meta.env.PUBLIC_WALINE_SERVER_URL ?? "").trim();

export const siteConfig = {
	title: "Newspaper",
	repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
	siteUrl: publicSiteUrl,
	defaultLocale: DEFAULT_LOCALE,
	locales: LOCALES,
	seo: {
		titleSeparator: " | ",
		defaultSocialImage: "social-card.svg",
	},
	typography: {
		preset: "editorial" as TypographyPreset,
	},
	author: {
		name: "JiU",
	},
	routes: {
		posts: "posts",
		archive: "archive",
		tags: "tags",
		search: "search",
		searchIndex: "search.json",
		about: "about",
		page: "page",
		rss: "rss",
		rssFile: "rss.xml",
	},
	navigation: ["home", "archive", "tags", "search", "about"] as const,
	posts: {
		featuredCount: 2,
		perPage: 6,
		relatedCount: 3,
	},
	search: {
		limit: 10,
		threshold: 0.32,
		cacheMaxAge: 3600,
		keys: [
			{ name: "title", weight: 0.45 },
			{ name: "excerpt", weight: 0.2 },
			{ name: "body", weight: 0.15 },
			{ name: "category", weight: 0.08 },
			{ name: "tags", weight: 0.12 },
		],
	},
	footer: {
		builtWithUrl: "https://astro.build",
	},
	comments: {
		serverURL: walineServerURL,
		meta: ["nick", "mail", "link"],
		requiredMeta: ["nick", "mail"],
		login: "enable",
		commentSorting: "latest",
		pageSize: 10,
		reaction: false,
	},
	socialLinks: [] as SocialLink[],
} as const;

export function hasPublicSiteUrl() {
	return siteConfig.siteUrl.length > 0;
}

export function hasWalineServerUrl() {
	return siteConfig.comments.serverURL.length > 0;
}
