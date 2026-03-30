export const LOCALES = ["zh-cn", "en"] as const;
export const DEFAULT_LOCALE = "zh-cn" as const;

export type SiteLocale = (typeof LOCALES)[number];

type Principle = {
	title: string;
	description: string;
};

type Dictionary = {
	langName: string;
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
	notFound: {
		title: string;
		description: string;
		body: string;
		goHome: string;
		viewArchive: string;
	};
	home: {
		eyebrow: string;
		title: string;
		description: string;
		browseArchive: string;
		startSearch: string;
		postCount: (count: number) => string;
		feedTitle: string;
		feedDescription: string;
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
		ready: (count: number) => string;
		matches: (query: string, count: number) => string;
		emptyTitle: string;
		emptyDescription: string;
		unavailableTitle: string;
		unavailableDescription: string;
	};
	about: {
		title: string;
		description: string;
		intro: string;
		body: string;
		principlesTitle: string;
		capabilitiesTitle: string;
	};
	principles: Principle[];
	post: {
		breadcrumbHome: string;
		breadcrumbPosts: string;
		tocTitle: string;
		relatedPosts: string;
		newerPost: string;
		olderPost: string;
		shareOnX: string;
		shareOnLinkedIn: string;
		shareByEmail: string;
	};
	pagination: {
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
		system: string;
		current: (label: string) => string;
	};
	copy: {
		idle: string;
		success: string;
		failure: string;
	};
};

const dictionaries: Record<SiteLocale, Dictionary> = {
	"zh-cn": {
		langName: "简体中文",
		langSwitchLabel: "切换语言",
		skipToContent: "跳到正文",
		site: {
			tagline: "一个简洁、耐读的 Astro 博客主题",
			description:
				"为个人博客准备的 Astro 主题，支持多语言、分页、搜索、标签、目录、阅读进度、代码复制和响应式图片。",
			authorBlurb: "适合写技术博客、项目记录、读书笔记和长期积累型内容。",
		},
		navigation: {
			label: "主导航",
			home: "首页",
			archive: "归档",
			tags: "标签",
			search: "搜索",
			about: "关于",
		},
		footer: {
			builtWith: "Built with",
		},
		notFound: {
			title: "页面不存在",
			description: "你访问的页面不存在，请尝试回到首页或归档继续浏览。",
			body: "链接可能已经移动，或者这个地址从未存在过。",
			goHome: "返回首页",
			viewArchive: "查看归档",
		},
		home: {
			eyebrow: "Paper-like reading, Astro-native architecture",
			title: "让博客像一份安静的数字报纸，适合长期写作与归档。",
			description:
				"主题延续 PaperMod 的清爽层次，同时吸收 astro-paper 与 fuwari 的轻盈感，把阅读、检索、多语言和长期维护放在更靠前的位置。",
			browseArchive: "浏览归档",
			startSearch: "开始搜索",
			postCount: (count) => `当前共 ${count} 篇文章`,
			feedTitle: "最新文章",
			feedDescription: "按时间顺序浏览内容，首页支持连续加载，归档与标签页则适合回看。",
		},
		archive: {
			title: "归档",
			description: "按年份浏览站点中的全部文章。",
			yearCount: (count) => `${count} 篇`,
		},
		tags: {
			title: "标签",
			description: "按主题聚合浏览内容。",
			relatedDescription: "与这个主题相关的全部文章。",
			pageDescription: (tag) => `浏览与 ${tag} 相关的全部文章。`,
		},
		search: {
			title: "搜索",
			description: "支持标题、摘要、标签、分类和正文关键词检索。",
			label: "搜索关键词",
			placeholder: "输入标题、摘要、标签、分类或正文关键词",
			loading: "正在加载文章索引…",
			ready: (count) => `已加载 ${count} 篇文章，输入后开始搜索。`,
			matches: (query, count) => `“${query}” 共命中 ${count} 条结果。`,
			emptyTitle: "没有找到匹配内容。",
			emptyDescription: "试试更短的关键词，或者换一个标签名。",
			unavailableTitle: "索引暂时不可用。",
			unavailableDescription: "你仍然可以通过归档和标签页继续浏览内容。",
		},
		about: {
			title: "关于",
			description: "了解 newspaper 的设计思路与功能取向。",
			intro: "一个偏阅读体验的个人博客主题，重点放在列表、索引、文章页和长期写作需要的基础功能。",
			body: "newspaper 不是应用壳，也不打算把博客做成沉重的内容平台。它更像一套干净的写作界面，把首页、分页、归档、标签、搜索和文章页组织成一套稳定的阅读路径。",
			principlesTitle: "主题原则",
			capabilitiesTitle: "内置能力",
		},
		principles: [
			{
				title: "内容优先",
				description: "页面结构服务于阅读和索引，而不是用花哨样式抢走正文注意力。",
			},
			{
				title: "Astro 原生",
				description: "优先使用 i18n、Content Collections、astro:assets、预取和视图过渡等官方能力。",
			},
			{
				title: "长期可维护",
				description: "功能保持克制，代码尽量复用，让主题适合持续写作和后续扩展。",
			},
		],
		post: {
			breadcrumbHome: "首页",
			breadcrumbPosts: "文章",
			tocTitle: "目录",
			relatedPosts: "相关文章",
			newerPost: "较新的文章",
			olderPost: "较早的文章",
			shareOnX: "分享到 X / Twitter",
			shareOnLinkedIn: "分享到 LinkedIn",
			shareByEmail: "通过 Email 分享",
		},
		pagination: {
			previous: "上一页",
			next: "下一页",
			summary: (currentPage, totalPages) => `第 ${currentPage} 页 / 共 ${totalPages} 页`,
		},
		reading: {
			minutes: (count) => `${count} 分钟阅读`,
		},
		theme: {
			label: "切换主题",
			light: "浅色模式",
			dark: "深色模式",
			system: "跟随系统",
			current: (label) => `切换主题，当前为${label}`,
		},
		copy: {
			idle: "复制",
			success: "已复制",
			failure: "失败",
		},
	},
	en: {
		langName: "English",
		langSwitchLabel: "Switch language",
		skipToContent: "Skip to content",
		site: {
			tagline: "An elegant Astro blog theme built for focused reading",
			description:
				"An Astro theme for long-form writing with i18n, pagination, search, tags, table of contents, reading progress, copyable code blocks, and responsive images.",
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
		notFound: {
			title: "Page not found",
			description: "The page you requested could not be found. Try the homepage or archive instead.",
			body: "The link may have moved, or this address may never have existed.",
			goHome: "Back home",
			viewArchive: "Open archive",
		},
		home: {
			eyebrow: "Paper-like reading, Astro-native architecture",
			title: "A calm digital newspaper layout for long-form writing and thoughtful archives.",
			description:
				"newspaper takes the clarity of PaperMod, blends in the softness of astro-paper and fuwari, and focuses the whole theme around reading, indexing, multilingual support, and long-term maintainability.",
			browseArchive: "Browse archive",
			startSearch: "Search posts",
			postCount: (count) => `${count} published posts`,
			feedTitle: "Latest writing",
			feedDescription:
				"Follow the newest posts here, then use archive, tags, and search when you want to explore by structure.",
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
			ready: (count) => `${count} posts indexed and ready to search.`,
			matches: (query, count) => `${count} matches for “${query}”.`,
			emptyTitle: "No results found.",
			emptyDescription: "Try a shorter phrase, or search using a tag name instead.",
			unavailableTitle: "The index is temporarily unavailable.",
			unavailableDescription: "You can still browse through the archive or tag pages.",
		},
		about: {
			title: "About",
			description: "Learn how newspaper approaches structure, reading, and long-term writing.",
			intro:
				"A reading-first blog theme that focuses on lists, indexes, article pages, and the essentials needed for sustained publishing.",
			body: "newspaper is not an app shell, and it does not try to turn a blog into a heavy content platform. It is closer to a clean editorial interface that organizes the homepage, pagination, archive, tags, search, and article pages into a stable reading path.",
			principlesTitle: "Design principles",
			capabilitiesTitle: "Built-in capabilities",
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
			shareOnX: "Share on X / Twitter",
			shareOnLinkedIn: "Share on LinkedIn",
			shareByEmail: "Share by email",
		},
		pagination: {
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
			system: "System",
			current: (label) => `Switch theme, current setting: ${label}`,
		},
		copy: {
			idle: "Copy",
			success: "Copied",
			failure: "Error",
		},
	},
};

export function resolveLocale(locale: string | undefined): SiteLocale {
	return locale === "en" ? "en" : DEFAULT_LOCALE;
}

export function getDictionary(locale: string | undefined) {
	return dictionaries[resolveLocale(locale)];
}

export function getHtmlLang(locale: string | undefined) {
	return resolveLocale(locale) === "en" ? "en" : "zh-CN";
}

export function getOgLocale(locale: string | undefined) {
	return resolveLocale(locale) === "en" ? "en_US" : "zh_CN";
}

export function isSiteLocale(value: string): value is SiteLocale {
	return (LOCALES as readonly string[]).includes(value);
}
