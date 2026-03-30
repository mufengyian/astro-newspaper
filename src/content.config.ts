import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { LOCALES } from "./utils/i18n";

const posts = defineCollection({
	loader: glob({
		base: "./src/content/posts",
		pattern: "**/*.{md,mdx}",
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			excerpt: z.string(),
			publishDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			draft: z.boolean().default(false),
			featured: z.boolean().default(false),
			locale: z.enum(LOCALES).default("zh-cn"),
			translationKey: z.string().optional(),
			category: z.string().optional(),
			tags: z.array(z.string()).default([]),
			authors: z.array(z.string()).default(["JiU"]),
			comments: z.boolean().default(true),
			cover: image().optional(),
			coverAlt: z.string().optional(),
		}),
});

export const collections = { posts };
