export const LOCALES = ["zh-cn", "en"] as const;
export const DEFAULT_LOCALE = "zh-cn" as const;

export type SiteLocale = (typeof LOCALES)[number];

export type Principle = {
	title: string;
	description: string;
};

export type Dictionary = {
	langName: string;
	langShortName: string;
	langSwitchLabel: string;
	skipToContent: string;
	site: {
		tagline: string;
		description: string;
		authorBlurb: string;
	};
	navigation: {
		label: string;
		home: string;
		archive: string;
		tags: string;
		search: string;
		about: string;
	};
	footer: {
		builtWith: string;
	};
	a11y: {
		backToTop: string;
		breadcrumb: string;
		pagination: string;
		notFound: string;
	};
	notFound: {
		title: string;
		description: string;
		redirectHint: string;
		ariaLabel: string;
	};
	home: {
		title: string;
		description: string;
		feedDescription: string;
		demoLead: string;
		socialLinksLabel: string;
		readmeBeforeLink: string;
		readmeLinkLabel: string;
		readmeAfterLink: string;
	};
	archive: {
		title: string;
		description: string;
		yearCount: (count: number) => string;
	};
	tags: {
		title: string;
		description: string;
		relatedDescription: string;
		pageDescription: (tag: string) => string;
	};
	search: {
		title: string;
		description: string;
		label: string;
		placeholder: string;
		loading: string;
		matches: (query: string, count: number) => string;
		emptyTitle: string;
		emptyDescription: string;
		unavailableTitle: string;
		unavailableDescription: string;
		openLabel: (title: string) => string;
	};
	about: {
		title: string;
		description: string;
	};
	principles: Principle[];
	post: {
		breadcrumbHome: string;
		breadcrumbPosts: string;
		tocTitle: string;
		relatedPosts: string;
		newerPost: string;
		olderPost: string;
		navigationLabel: string;
		openLabel: (title: string) => string;
	};
	pagination: {
		label: string;
		previous: string;
		next: string;
		summary: (currentPage: number, totalPages: number) => string;
	};
	reading: {
		minutes: (count: number) => string;
	};
	theme: {
		label: string;
		light: string;
		dark: string;
		current: (label: string) => string;
	};
	copy: {
		idle: string;
		success: string;
		failure: string;
	};
	comments: {
		title: string;
		description: string;
	};
	rss: {
		pageTitle: string;
		unavailableTitle: string;
		redirectLabel: string;
		unavailableDescription: string;
		backHome: string;
		unavailableFeedMessage: string;
	};
};
