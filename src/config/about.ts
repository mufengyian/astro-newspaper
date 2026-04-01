import { siteConfig } from "./site";
import type { SiteLocale } from "./i18n";

type AboutSection = {
	title: string;
	paragraphs: string[];
	list?: readonly string[];
};

type AboutContent = {
	lead: string;
	sections: AboutSection[];
};

const aboutContentByLocale: Record<SiteLocale, AboutContent> = {
	"zh-cn": {
		lead: "围绕长期写作、多语言内容组织和稳定阅读体验构建的 Astro 主题。",
		sections: [
			{
				title: "主题定位",
				paragraphs: [
					"newspaper 面向个人博客、项目记录、技术笔记和长期积累型内容站点，重点不是复杂的交互包装，而是让内容结构长期保持清晰、稳定、可维护。",
					"首页用于承接最新内容，归档与标签负责结构化回看，搜索负责快速定位，文章页负责专注阅读，整体围绕持续发布而不是短期展示来设计。",
				],
			},
			{
				title: "现有能力",
				paragraphs: ["当前版本已经覆盖一个内容型主题常用的核心能力，并尽量保持 Astro 原生实现。"],
				list: siteConfig.capabilities,
			},
			{
				title: "内容组织方式",
				paragraphs: [
					"主题内置首页、分页、归档、标签、搜索、RSS、404 与文章详情页，适合从轻量博客逐步扩展到稳定的个人知识库。",
					"多语言通过 zh-cn 与 en 两套路由独立组织；如果同一篇文章存在双语版本，可通过 translationKey 建立对应关系，语言切换会优先跳转到匹配文章。",
				],
			},
			{
				title: "扩展基础",
				paragraphs: [
					"内容层基于 Content Collections，文章元数据、图片资源和路由生成都保持在 Astro 推荐链路内，方便后续继续扩展 MDX、封面图和 SEO 配置。",
					"样式层已按 tokens、base、layout、listing、article、responsive 分层，评论、主题切换、代码复制、阅读进度和搜索等交互也都拆成独立脚本模块，便于继续维护和演进。",
				],
			},
		],
	},
	en: {
		lead: "An Astro theme designed for long-form publishing, multilingual structure, and stable reading flows.",
		sections: [
			{
				title: "Positioning",
				paragraphs: [
					"newspaper is built for personal blogs, project logs, technical notes, and steadily growing content sites. The goal is not to simulate an app shell, but to keep content structure clear, durable, and easy to maintain over time.",
					"The homepage highlights recent writing, archive and tags support structured browsing, search handles fast retrieval, and article pages stay focused on reading. The whole theme is organized around sustained publishing rather than short-term presentation.",
				],
			},
			{
				title: "Current capabilities",
				paragraphs: ["The current version already covers the core capabilities expected from a production-ready content theme while staying as Astro-native as possible."],
				list: siteConfig.capabilities,
			},
			{
				title: "Content structure",
				paragraphs: [
					"The theme ships with a homepage, pagination, archive, tags, search, RSS, 404 handling, and article detail pages, which makes it suitable for both simple blogs and longer-lived knowledge bases.",
					"Multilingual content is organized through separate zh-cn and en routes. When a post exists in both languages, translationKey can link the two versions so the language switch points to the corresponding article first.",
				],
			},
			{
				title: "Extension baseline",
				paragraphs: [
					"The content layer is built on Content Collections, so post metadata, image assets, and route generation stay within Astro's recommended workflow, making future MDX, cover image, and SEO extensions easier to manage.",
					"The style layer is split into tokens, base, layout, listing, article, and responsive files, and interactive features such as comments, theme switching, code copy, reading progress, and search are already isolated into dedicated scripts for ongoing iteration.",
				],
			},
		],
	},
};

export function getAboutContent(locale: SiteLocale) {
	return aboutContentByLocale[locale];
}
