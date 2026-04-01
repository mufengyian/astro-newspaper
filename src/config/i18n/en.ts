import type { Dictionary } from "./types";

export const enDictionary: Dictionary = {
	langName: "English",
	langShortName: "En",
	langSwitchLabel: "Switch language",
	skipToContent: "Skip to content",
	site: {
		tagline: "An elegant Astro blog theme built for focused reading",
		description:
			"An Astro theme for long-form writing with i18n, pagination, search, tags, a table of contents, reading progress, copyable code blocks, and responsive images.",
		authorBlurb:
			"A good fit for technical blogs, project notes, reading journals, and steadily growing knowledge bases.",
	},
	navigation: {
		label: "Main navigation",
		home: "Home",
		archive: "Archive",
		tags: "Tags",
		search: "Search",
		about: "About",
	},
	footer: {
		builtWith: "Built with",
	},
	a11y: {
		backToTop: "Back to top",
		breadcrumb: "Breadcrumb",
		pagination: "Pagination",
		notFound: "Page not found",
	},
	notFound: {
		title: "Page not found",
		description: "The page you requested could not be found. Try the homepage or continue browsing instead.",
		redirectHint: "Returning to the previous page or homepage in 2 seconds",
		ariaLabel: "Page not found",
	},
	home: {
		title: "A calm digital newspaper layout for long-form writing and thoughtful archives.",
		description:
			"newspaper takes the clarity of PaperMod, blends in the softness of astro-paper and fuwari, and focuses the whole theme around reading, indexing, multilingual support, and long-term maintainability.",
		feedDescription:
			"Follow the newest posts here, then use the archive, tags, and search when you want to explore by structure.",
		demoLead: "Welcome to the demo page of {title}.",
		socialLinksLabel: "Social links:",
		readmeBeforeLink: "Read the posts or check the",
		readmeLinkLabel: "English README",
		readmeAfterLink: "for setup details.",
	},
	archive: {
		title: "Archive",
		description: "Browse every post on the site by year.",
		yearCount: (count) => `${count} posts`,
	},
	tags: {
		title: "Tags",
		description: "Browse posts by topic.",
		relatedDescription: "Every post related to this topic.",
		pageDescription: (tag) => `Browse every post related to ${tag}.`,
	},
	search: {
		title: "Search",
		description: "Search by title, excerpt, tags, category, or post body.",
		label: "Search terms",
		placeholder: "Search titles, excerpts, tags, categories, or body text",
		loading: "Loading the search index…",
		matches: (query, count) => `${count} matches for “${query}”`,
		emptyTitle: "No results found.",
		emptyDescription: "Try a shorter phrase, or search using a tag name instead.",
		unavailableTitle: "The index is temporarily unavailable.",
		unavailableDescription: "You can still browse through the archive or tag pages.",
		openLabel: (title) => `Open ${title}`,
	},
	about: {
		title: "About",
		description: "Learn how newspaper approaches structure, reading, and long-term writing.",
	},
	principles: [
		{
			title: "Content first",
			description: "The layout serves reading and discovery instead of competing with the article body.",
		},
		{
			title: "Astro native",
			description:
				"The theme leans on official Astro features such as i18n, Content Collections, astro:assets, prefetching, and view transitions.",
		},
		{
			title: "Built to last",
			description:
				"The feature set stays focused and the code stays reusable so the theme can support years of writing.",
		},
	],
	post: {
		breadcrumbHome: "Home",
		breadcrumbPosts: "Posts",
		tocTitle: "Contents",
		relatedPosts: "Related posts",
		newerPost: "Newer post",
		olderPost: "Older post",
		navigationLabel: "Post navigation",
		openLabel: (title) => `Open post: ${title}`,
	},
	pagination: {
		label: "Pagination",
		previous: "Previous",
		next: "Next",
		summary: (currentPage, totalPages) => `Page ${currentPage} of ${totalPages}`,
	},
	reading: {
		minutes: (count) => `${count} min read`,
	},
	theme: {
		label: "Switch theme",
		light: "Light mode",
		dark: "Dark mode",
		current: (label) => `Switch theme, current setting: ${label}`,
	},
	copy: {
		idle: "Copy",
		success: "Copied",
		failure: "Error",
	},
	comments: {
		title: "Comments",
		description: "Join the discussion.",
	},
	rss: {
		pageTitle: "RSS Feed",
		unavailableTitle: "RSS Unavailable",
		redirectLabel: "The RSS feed is available at",
		unavailableDescription: "The RSS feed is unavailable until a public site URL is configured.",
		backHome: "Back to home",
		unavailableFeedMessage: "RSS feed is unavailable until a public site URL is configured.",
	},
};
