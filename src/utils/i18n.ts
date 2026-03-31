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
	localeLabels: Record<SiteLocale, string>;
	skipToContent: string;
	site: {
		tagline: string;
		description: string;
		authorBlurb: string;
		capabilities: string[];
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
		sourceCode: string;
		rss: string;
	};
	common: {
		rssLabel: string;
		repositoryLabel: string;
		socialLinksLabel: string;
		backHome: string;
		backToTop: string;
		paginationLabel: string;
		breadcrumbLabel: string;
		postNavigationLabel: string;
		openPost: (title: string) => string;
		openRelatedPost: (title: string) => string;
		openSearchResult: (title: string) => string;
		openTag: (tag: string) => string;
	};
	notFound: {
		title: string;
		description: string;
		body: string;
		goHome: string;
		viewArchive: string;
		redirectNotice: string;
	};
	home: {
		eyebrow: string;
		title: string;
		description: string;
		browseArchive: string;
		startSearch: string;
		viewSource: string;
		readRss: string;
		repositoryHint: string;
		postCount: (count: number) => string;
		featuredCount: (count: number) => string;
		languageCount: (count: number) => string;
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
		next: (label: string) => string;
	};
	comments: {
		title: string;
		description: string;
	};
	copy: {
		idle: string;
		success: string;
		failure: string;
	};
	rss: {
		redirectTitle: string;
		redirectAvailable: (target: string) => string;
		redirectUnavailable: string;
		unavailableFeed: string;
	};
};

const dictionaries: Record<SiteLocale, Dictionary> = {
	"zh-cn": {
		langName: "简体中文",
		langSwitchLabel: "切换语言",
		localeLabels: {
			"zh-cn": "中文",
			en: "English",
		},
		skipToContent: "跳到正文",
		site: {
			tagline: "为长期写作准备的安静 Astro 报刊主题",
			description:
				"一个强调阅读节奏、信息索引与长期维护体验的 Astro 博客主题，内建多语言、分页、搜索、标签、目录、阅读进度、代码复制与响应式图片。",
			authorBlurb:
				"适合技术博客、项目记录、读书笔记与持续积累型内容站点，也适合作为团队内部知识库的轻量外壳。",
			capabilities: [
				"Astro 原生 i18n 路由与 hreflang",
				"Content Collections 内容校验",
				"MDX / Markdown 双格式写作",
				"响应式图片与现代格式输出",
				"按语言分离的 RSS 与搜索索引",
				"高对比浅色 / 深色 / 跟随系统主题",
				"标签索引、归档页与相关文章推荐",
				"Waline 评论、代码复制与阅读进度",
			],
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
			builtWith: "构建于",
			sourceCode: "源码",
			rss: "RSS",
		},
		common: {
			rssLabel: "RSS 订阅",
			repositoryLabel: "项目仓库",
			socialLinksLabel: "社交链接",
			backHome: "返回首页",
			backToTop: "回到顶部",
			paginationLabel: "分页导航",
			breadcrumbLabel: "面包屑导航",
			postNavigationLabel: "文章上下篇导航",
			openPost: (title) => `打开文章：${title}`,
			openRelatedPost: (title) => `打开相关文章：${title}`,
			openSearchResult: (title) => `打开搜索结果：${title}`,
			openTag: (tag) => `查看标签：${tag}`,
		},
		notFound: {
			title: "页面不存在",
			description: "你访问的页面不存在，可以返回首页或前往归档继续浏览。",
			body: "链接可能已经移动，或者这个地址从未存在过。",
			goHome: "返回首页",
			viewArchive: "查看归档",
			redirectNotice: "5 秒后自动返回首页。",
		},
		home: {
			eyebrow: "Astro 原生、多语言、为阅读设计",
			title: "像一份现代数字报刊那样组织你的长期写作。",
			description:
				"这套主题把首页、分页、搜索、归档、标签与文章详情串成一条清晰的阅读路径，用更少的客户端脚本和更稳的设计系统支撑长期维护。",
			browseArchive: "浏览归档",
			startSearch: "开始搜索",
			viewSource: "查看仓库",
			readRss: "RSS 订阅",
			repositoryHint: "你可以直接开始写作，也可以先阅读 README 了解安装与扩展方式。",
			postCount: (count) => `${count} 篇已发布文章`,
			featuredCount: (count) => `${count} 个首页优先展示位`,
			languageCount: (count) => `${count} 种站点语言`,
			feedTitle: "最新内容",
			feedDescription: "按时间顺序浏览文章，继续向下滚动即可查看分页后的内容。",
		},
		archive: {
			title: "归档",
			description: "按年份快速浏览站点中的全部文章。",
			yearCount: (count) => `${count} 篇`,
		},
		tags: {
			title: "标签",
			description: "按主题聚合内容，快速跳转到同一话题下的文章。",
			relatedDescription: "以下是与当前标签相关的全部文章。",
			pageDescription: (tag) => `浏览标签“${tag}”下的全部文章。`,
		},
		search: {
			title: "搜索",
			description: "支持标题、摘要、标签、分类与正文关键字检索。",
			label: "搜索关键字",
			placeholder: "输入标题、摘要、标签、分类或正文关键字",
			loading: "正在准备搜索索引…",
			ready: (count) => `已加载 ${count} 篇文章的搜索索引，输入后即可检索。`,
			matches: (query, count) => `“${query}” 共找到 ${count} 条结果。`,
			emptyTitle: "没有找到匹配内容",
			emptyDescription: "试试更短的关键词，或者直接搜索标签名称。",
			unavailableTitle: "搜索索引暂时不可用",
			unavailableDescription: "你仍然可以通过归档页或标签页继续浏览内容。",
		},
		about: {
			title: "关于",
			description: "了解 newspaper 的设计思路、能力边界与长期维护方向。",
			intro: "一个以阅读优先为核心的 Astro 主题，重点打磨结构、排版、检索与长期可维护性。",
			body: "newspaper 不追求臃肿的应用壳层，而是把首页、分页、归档、标签、搜索与文章详情组织成稳定清晰的内容路径，让写作和阅读都更轻松。",
			principlesTitle: "设计原则",
			capabilitiesTitle: "内建能力",
		},
		principles: [
			{
				title: "内容优先",
				description: "视觉层次服务于阅读与检索，而不是用复杂装饰抢走正文注意力。",
			},
			{
				title: "Astro 原生",
				description: "尽量依赖 Astro 官方能力，减少不必要的框架负担与客户端脚本。",
			},
			{
				title: "长期可维护",
				description: "通过统一配置、共享页面逻辑和设计令牌，让主题适合持续演进。",
			},
		],
		post: {
			breadcrumbHome: "首页",
			breadcrumbPosts: "文章",
			tocTitle: "目录",
			relatedPosts: "相关文章",
			newerPost: "较新的文章",
			olderPost: "较早的文章",
		},
		pagination: {
			previous: "上一页",
			next: "下一页",
			summary: (currentPage, totalPages) => `第 ${currentPage} 页，共 ${totalPages} 页`,
		},
		reading: {
			minutes: (count) => `${count} 分钟阅读`,
		},
		theme: {
			label: "切换主题",
			light: "浅色模式",
			dark: "深色模式",
			system: "跟随系统",
			current: (label) => `当前主题：${label}`,
			next: (label) => `点击切换到：${label}`,
		},
		comments: {
			title: "评论",
			description: "欢迎留下你的想法、补充或问题。",
		},
		copy: {
			idle: "复制",
			success: "已复制",
			failure: "复制失败",
		},
		rss: {
			redirectTitle: "RSS 订阅",
			redirectAvailable: (target) => `RSS 地址已切换到 ${target}`,
			redirectUnavailable: "当前还没有可用的 RSS，需要先配置公开站点地址。",
			unavailableFeed: "RSS 订阅暂时不可用，请先配置公开站点地址。",
		},
	},
	en: {
		langName: "English",
		langSwitchLabel: "Switch language",
		localeLabels: {
			"zh-cn": "中文",
			en: "English",
		},
		skipToContent: "Skip to content",
		site: {
			tagline: "An editorial Astro theme designed for long-form publishing",
			description:
				"A reading-first Astro blog theme with multilingual routes, pagination, search, tags, table of contents, reading progress, copyable code blocks, and responsive images.",
			authorBlurb:
				"A strong fit for technical blogs, product notes, project journals, and steadily growing documentation-driven sites.",
			capabilities: [
				"Astro-native i18n routing with hreflang alternates",
				"Content Collections schema validation",
				"MDX and Markdown authoring support",
				"Responsive images with modern output formats",
				"Per-locale RSS feeds and search indexes",
				"Accessible light, dark, and system theme modes",
				"Tag archive, yearly archive, and related posts",
				"Waline comments, code copy, and reading progress",
			],
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
			sourceCode: "Source",
			rss: "RSS",
		},
		common: {
			rssLabel: "RSS feed",
			repositoryLabel: "Project repository",
			socialLinksLabel: "Social links",
			backHome: "Back home",
			backToTop: "Back to top",
			paginationLabel: "Pagination",
			breadcrumbLabel: "Breadcrumb",
			postNavigationLabel: "Post navigation",
			openPost: (title) => `Open post: ${title}`,
			openRelatedPost: (title) => `Open related post: ${title}`,
			openSearchResult: (title) => `Open search result: ${title}`,
			openTag: (tag) => `Open tag: ${tag}`,
		},
		notFound: {
			title: "Page not found",
			description: "The page you requested could not be found. Try the homepage or archive instead.",
			body: "The link may have moved, or this address may never have existed.",
			goHome: "Back home",
			viewArchive: "Open archive",
			redirectNotice: "Redirecting to the homepage in 5 seconds.",
		},
		home: {
			eyebrow: "Astro-native, multilingual, and tuned for reading",
			title: "Publish long-form writing in a calm digital newspaper layout.",
			description:
				"newspaper turns homepage, search, tags, archive, and article pages into one consistent editorial system with less client-side JavaScript and more reusable structure.",
			browseArchive: "Browse archive",
			startSearch: "Search posts",
			viewSource: "View source",
			readRss: "Open RSS",
			repositoryHint: "Start writing right away, or read the README first to understand installation and extension points.",
			postCount: (count) => `${count} published posts`,
			featuredCount: (count) => `${count} featured slots on the homepage`,
			languageCount: (count) => `${count} site languages`,
			feedTitle: "Latest writing",
			feedDescription: "Browse posts in reverse chronological order and continue into paginated archives below.",
		},
		archive: {
			title: "Archive",
			description: "Browse every post on the site by year.",
			yearCount: (count) => `${count} posts`,
		},
		tags: {
			title: "Tags",
			description: "Browse the site by topic and jump directly into related writing.",
			relatedDescription: "Every post connected to this topic appears below.",
			pageDescription: (tag) => `Browse every post related to ${tag}.`,
		},
		search: {
			title: "Search",
			description: "Search across titles, excerpts, tags, categories, and full post content.",
			label: "Search terms",
			placeholder: "Search titles, excerpts, tags, categories, or body text",
			loading: "Preparing the search index…",
			ready: (count) => `${count} posts indexed and ready to search.`,
			matches: (query, count) => `${count} matches for “${query}”.`,
			emptyTitle: "No results found",
			emptyDescription: "Try a shorter phrase, or search with a tag instead.",
			unavailableTitle: "The search index is temporarily unavailable",
			unavailableDescription: "You can still browse through the archive or tag pages.",
		},
		about: {
			title: "About",
			description: "Learn how newspaper approaches structure, styling, and long-term maintainability.",
			intro: "A reading-first Astro theme built to keep publishing smooth, fast, and maintainable over time.",
			body: "newspaper avoids turning a blog into a heavy app shell. Instead, it focuses on the steady essentials: homepage discovery, search, pagination, archive structure, and a comfortable article reading experience.",
			principlesTitle: "Design principles",
			capabilitiesTitle: "Built-in capabilities",
		},
		principles: [
			{
				title: "Content first",
				description: "Visual design supports reading and discovery instead of competing with the article body.",
			},
			{
				title: "Astro native",
				description: "The theme leans on official Astro features to stay lightweight and future-friendly.",
			},
			{
				title: "Built to last",
				description: "Shared page logic, strong design tokens, and centralized configuration make future work easier.",
			},
		],
		post: {
			breadcrumbHome: "Home",
			breadcrumbPosts: "Posts",
			tocTitle: "Contents",
			relatedPosts: "Related posts",
			newerPost: "Newer post",
			olderPost: "Older post",
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
			system: "System mode",
			current: (label) => `Current theme: ${label}`,
			next: (label) => `Switch to: ${label}`,
		},
		comments: {
			title: "Comments",
			description: "Join the discussion and share your perspective.",
		},
		copy: {
			idle: "Copy",
			success: "Copied",
			failure: "Error",
		},
		rss: {
			redirectTitle: "RSS feed",
			redirectAvailable: (target) => `The RSS feed is available at ${target}`,
			redirectUnavailable: "The RSS feed is unavailable until a public site URL is configured.",
			unavailableFeed: "The RSS feed is unavailable until a public site URL is configured.",
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

export function getHrefLang(locale: string | undefined) {
	return getHtmlLang(locale);
}

export function getOgLocale(locale: string | undefined) {
	return resolveLocale(locale) === "en" ? "en_US" : "zh_CN";
}

export function isSiteLocale(value: string): value is SiteLocale {
	return (LOCALES as readonly string[]).includes(value);
}
