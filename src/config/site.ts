import { DEFAULT_LOCALE, LOCALES, type SiteLocale } from "../utils/i18n";

const publicSiteUrl = (import.meta.env.PUBLIC_SITE_URL ?? "").trim();
const walineServerURL = (import.meta.env.PUBLIC_WALINE_SERVER_URL ?? "").trim();

export type SocialLinkLabel = "GitHub" | "X" | "LinkedIn" | "Email";

export type SocialLink = {
	label: SocialLinkLabel;
	href: string;
};

export type TypographyPreset = "editorial" | "wenkai";

export type NavigationKey = "home" | "archive" | "tags" | "search" | "about";

export type ConfigurableLink = {
	label: string;
	href: string;
	newTab?: boolean;
	rel?: string;
};

export type FooterConfig = {
	copyrightYear: number;
	owner: ConfigurableLink;
	icp: {
		enabled: boolean;
		label: string;
		href: string;
	};
	poweredBy: ConfigurableLink;
	theme: ConfigurableLink;
	labels: {
		poweredBy: string;
		themeIs: string;
	};
};

const navigationItems = ["home", "archive", "tags", "search", "about"] as const satisfies readonly NavigationKey[];

const repositoryReadmePathByLocale: Record<SiteLocale, string> = {
	"zh-cn": "#readme",
	en: "/blob/main/README.en.md",
};

export const THEME_STORAGE_KEY = "newspaper-theme";

export const siteConfig = {
	title: "Newspaper",
	repositoryUrl: "https://github.com/mufengyian/astro-newspaper",
	siteUrl: publicSiteUrl,
	defaultLocale: DEFAULT_LOCALE,
	locales: LOCALES,
	navigationItems,
	assets: {
		faviconSvg: "favicon.svg",
		faviconIco: "favicon.ico",
		socialCard: "social-card.svg",
	},
	seo: {
		themeColor: {
			light: "#F7FAFC",
			dark: "#171923",
		},
	},
	typography: {
		preset: "editorial" as TypographyPreset,
	},
	homeInfo: {
		enabled: true,
	},
	author: {
		name: "JiU",
	},
	footer: {
		copyrightYear: 2026,
		owner: {
			label: "赵阿卷",
			href: "https://blog.zwying.com/",
		},
		icp: {
			enabled: true,
			label: "京ICP备17025554号-2",
			href: "https://beian.miit.gov.cn/#/Integrated/index",
		},
		poweredBy: {
			label: "Typecho",
			href: "http://typecho.org",
			newTab: true,
			rel: "noreferrer",
		},
		theme: {
			label: "Cuteen",
			href: "https://blog.zwying.com",
			newTab: true,
			rel: "noreferrer",
		},
		labels: {
			poweredBy: "Powered by",
			themeIs: "Theme is",
		},
	} as FooterConfig,
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

export function getReadmeUrl(locale: SiteLocale) {
	return `${siteConfig.repositoryUrl}${repositoryReadmePathByLocale[locale]}`;
}

export function hasPublicSiteUrl() {
	return siteConfig.siteUrl.length > 0;
}

export function hasWalineServerUrl() {
	return siteConfig.comments.serverURL.length > 0;
}
