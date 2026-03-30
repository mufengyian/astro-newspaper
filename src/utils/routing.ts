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

export function getLocaleAlternates(pathname: string) {
	const path = stripLocaleFromPath(pathname);
	return LOCALES.map((locale) => ({
		locale,
		relativeUrl: getLocalizedPath(locale, path),
		absoluteUrl: getAbsoluteLocalizedPath(locale, path),
	}));
}

export function getCanonicalPath(locale: SiteLocale, pathname: string) {
	return getAbsoluteLocalizedPath(locale, stripLocaleFromPath(pathname));
}
