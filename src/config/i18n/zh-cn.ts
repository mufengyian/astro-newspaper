import type { Dictionary } from "./types";

export const zhCnDictionary: Dictionary = {
	langName: "简体中文",
	langShortName: "Zh",
	langSwitchLabel: "切换语言",
	skipToContent: "跳到正文",
	site: {
		tagline: "一个简洁、耐读的 Astro 博客主题",
		description:
			"一个为长期写作准备的 Astro 主题，支持多语言、分页、搜索、标签、目录、阅读进度、代码复制和响应式图片。",
		authorBlurb: "适合技术博客、项目记录、读书笔记，以及长期积累型内容。",
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
	a11y: {
		backToTop: "回到顶部",
		breadcrumb: "面包屑导航",
		pagination: "分页",
		notFound: "页面不存在",
	},
	notFound: {
		title: "页面不存在",
		description: "你访问的页面不存在，请尝试返回首页或继续浏览其他内容。",
		redirectHint: "2 秒后返回上一页或首页",
		ariaLabel: "页面不存在",
	},
	home: {
		title: "让博客像一份安静的数字报纸，适合长期写作与归档。",
		description:
			"主题延续 PaperMod 的清爽层次，同时吸收 astro-paper 与 fuwari 的轻盈感，把阅读、检索、多语言和长期维护放在更靠前的位置。",
		feedDescription: "按时间顺序浏览内容，首页适合连续阅读，归档与标签页则更适合结构化回看。",
		demoLead: "欢迎来到 {title} 的主题演示页。",
		socialLinksLabel: "社交链接：",
		readmeBeforeLink: "你可以直接阅读文章，也可以查看",
		readmeLinkLabel: "README",
		readmeAfterLink: "了解更多使用方式。",
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
		matches: (query, count) => `“${query}” 共命中 ${count} 条结果。`,
		emptyTitle: "没有找到匹配内容。",
		emptyDescription: "试试更短的关键词，或者换一个标签名。",
		unavailableTitle: "索引暂时不可用。",
		unavailableDescription: "你仍然可以通过归档和标签页继续浏览内容。",
		openLabel: (title) => `打开 ${title}`,
	},
	about: {
		title: "关于",
		description: "了解 newspaper 的设计思路与功能取向。",
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
		navigationLabel: "文章上下篇",
		openLabel: (title) => `查看文章：${title}`,
	},
	pagination: {
		label: "分页",
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
		current: (label) => `切换主题，当前为 ${label}`,
	},
	copy: {
		idle: "复制",
		success: "已复制",
		failure: "失败",
	},
	comments: {
		title: "评论",
		description: "欢迎留下你的看法。",
	},
	rss: {
		pageTitle: "RSS Feed",
		unavailableTitle: "RSS 暂不可用",
		redirectLabel: "RSS 链接已移动到",
		unavailableDescription: "当前还没有可用的 RSS Feed。配置公开站点地址后，这里会提供订阅链接。",
		backHome: "返回首页",
		unavailableFeedMessage: "RSS 订阅暂不可用，请先配置公开站点地址。",
	},
};
