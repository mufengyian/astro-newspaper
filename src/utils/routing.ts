import { getCollection } from "astro:content";
import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from "astro:i18n";
import { siteConfig } from "../config";
import { DEFAULT_LOCALE, LOCALES, isSiteLocale, type SiteLocale } from "./i18n";

export function trimSlashes(value = "") {
	return value.replace(/^\/+|\/+$/g, "");
}

export function withBase(path = "") {
	const base = import.meta.env.BASE_URL;
	const normalizedBase =
		base === "/" ? "/" : `${base.replace(/\/+$/, "").replace(/^([^/])/, "/$1")}/`;
	const trimmedPath = trimSlashes(path);
	if (!trimmedPath) {
		return normalizedBase;
	}

	return normalizedBase === "/" ? `/${trimmedPath}` : `${normalizedBase}${trimmedPath}`;
}

export function stripBasePath(pathname: string) {
	const normalizedBase = import.meta.env.BASE_URL === "/" ? "/" : import.meta.env.BASE_URL.replace(/\/+$/, "");
	if (normalizedBase === "/") {
		return pathname || "/";
	}

	if (pathname === normalizedBase) {
		return "/";
	}

	return pathname.startsWith(`${normalizedBase}/`) ? pathname.slice(normalizedBase.length) || "/" : pathname;
}

export function stripLocaleFromPath(pathname: string) {
	const segments = trimSlashes(stripBasePath(pathname)).split("/").filter(Boolean);
	if (segments.length === 0) {
		return "";
	}

	if (isSiteLocale(segments[0]) && segments[0] !== DEFAULT_LOCALE) {
		segments.shift();
	}

	return segments.join("/");
}

export function getLocaleFromPathname(pathname: string): SiteLocale {
	const segments = trimSlashes(stripBasePath(pathname)).split("/").filter(Boolean);
	const firstSegment = segments[0];
	return firstSegment && isSiteLocale(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function getLocalizedPath(locale: SiteLocale, path = "") {
	return getRelativeLocaleUrl(locale, trimSlashes(path));
}

export function getAbsoluteLocalizedPath(locale: SiteLocale, path = "") {
	if (!siteConfig.siteUrl) {
		return undefined;
	}

	return getAbsoluteLocaleUrl(locale, trimSlashes(path));
}

export function getHomePermalink(locale: SiteLocale) {
	return getLocalizedPath(locale);
}

export function getArchivePermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "archive");
}

export function getTagsPermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "tags");
}

export function getSearchPermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "search");
}

export function getSearchIndexPermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "search.json");
}

export function getAboutPermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "about");
}

export function getPagePermalink(locale: SiteLocale, page: number) {
	return page <= 1 ? getHomePermalink(locale) : getLocalizedPath(locale, `page/${page}`);
}

export function getRssPermalink(locale: SiteLocale) {
	return getLocalizedPath(locale, "rss.xml");
}

type LocaleAlternate = {
	locale: SiteLocale;
	relativeUrl?: string;
	absoluteUrl?: string;
};

function getTranslationKey(post: { id: string; data: { translationKey?: string } }) {
	return post.data.translationKey?.trim() || post.id;
}

function isVisiblePost(post: { data: { draft?: boolean } }) {
	return import.meta.env.DEV || !post.data.draft;
}

function getLocalizedPostAlternate(locale: SiteLocale, postId: string, translationKey: string, posts: Awaited<ReturnType<typeof getCollection<"posts">>>) {
	const exactMatch = posts.find((post) => post.data.locale === locale && getTranslationKey(post) === translationKey);
	if (exactMatch) {
		return {
			relativeUrl: getLocalizedPath(locale, `posts/${exactMatch.id}`),
			absoluteUrl: getAbsoluteLocalizedPath(locale, `posts/${exactMatch.id}`),
		};
	}

	const defaultMatch = posts.find(
		(post) => post.data.locale === DEFAULT_LOCALE && getTranslationKey(post) === translationKey,
	);

	if (defaultMatch && locale !== DEFAULT_LOCALE) {
		return {
			relativeUrl: getLocalizedPath(locale, `posts/${defaultMatch.id}`),
			absoluteUrl: getAbsoluteLocalizedPath(locale, `posts/${defaultMatch.id}`),
		};
	}

	if (defaultMatch) {
		return {
			relativeUrl: getLocalizedPath(locale, `posts/${defaultMatch.id}`),
			absoluteUrl: getAbsoluteLocalizedPath(locale, `posts/${defaultMatch.id}`),
		};
	}

	if (locale === DEFAULT_LOCALE) {
		return {
			relativeUrl: getLocalizedPath(locale, `posts/${postId}`),
			absoluteUrl: getAbsoluteLocalizedPath(locale, `posts/${postId}`),
		};
	}

	return {};
}

export async function getLocaleAlternates(pathname: string, currentLocale = getLocaleFromPathname(pathname)): Promise<LocaleAlternate[]> {
	const path = stripLocaleFromPath(pathname);
	const segments = trimSlashes(path).split("/").filter(Boolean);
	const isPostPath = segments[0] === "posts" && segments.length > 1;

	if (!isPostPath) {
		return LOCALES.map((locale) => ({
			locale,
			relativeUrl: getLocalizedPath(locale, path),
			absoluteUrl: getAbsoluteLocalizedPath(locale, path),
		}));
	}

	const postId = segments.slice(1).join("/");
	const posts = (await getCollection("posts")).filter(isVisiblePost);
	const currentPost =
		posts.find((post) => post.id === postId && post.data.locale === currentLocale) ??
		posts.find((post) => post.id === postId);

	if (!currentPost) {
		return LOCALES.map((locale) => ({
			locale,
			relativeUrl: getLocalizedPath(locale, path),
			absoluteUrl: getAbsoluteLocalizedPath(locale, path),
		}));
	}

	const translationKey = getTranslationKey(currentPost);

	return LOCALES.map((locale) => ({
		locale,
		...getLocalizedPostAlternate(locale, postId, translationKey, posts),
	}));
}

export function getCanonicalPath(locale: SiteLocale, pathname: string) {
	return getAbsoluteLocalizedPath(locale, stripLocaleFromPath(pathname));
}
