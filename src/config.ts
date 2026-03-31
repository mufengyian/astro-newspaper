import { DEFAULT_LOCALE, LOCALES } from "./utils/i18n";

const publicSiteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "").trim();
const walineServerURL = (import.meta.env.PUBLIC_WALINE_SERVER_URL ?? "").trim();

type SocialLink = {
	label: "GitHub" | "X" | "LinkedIn" | "Email";
	href: string;
};

export const siteConfig = {
	title: "Newspaper",
	repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
	siteUrl: publicSiteUrl,
	defaultLocale: DEFAULT_LOCALE,
	locales: LOCALES,
	typography: {
		preset: "editorial",
	},
	author: {
		name: "JiU",
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
	featuredCount: 2,
	postsPerPage: 6,
	capabilities: [
		"Astro i18n",
		"Content Collections",
		"MDX",
		"Responsive Images",
		"View Transitions",
		"Prefetch",
		"Search",
		"RSS",
		"Dark Mode",
	],
} as const;

export function hasPublicSiteUrl() {
	return siteConfig.siteUrl.length > 0;
}

export function hasWalineServerUrl() {
	return siteConfig.comments.serverURL.length > 0;
}
