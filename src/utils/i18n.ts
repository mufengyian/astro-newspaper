import {
	DEFAULT_LOCALE,
	LOCALES,
	dictionaries,
	type Dictionary,
	type Principle,
	type SiteLocale,
} from "../config/i18n";

export { DEFAULT_LOCALE, LOCALES, type Dictionary, type Principle, type SiteLocale };

export function resolveLocale(locale: string | undefined): SiteLocale {
	return locale === "en" ? "en" : DEFAULT_LOCALE;
}

export function getDictionary(locale: string | undefined): Dictionary {
	return dictionaries[resolveLocale(locale)];
}

export function getLocaleShortName(locale: SiteLocale) {
	return dictionaries[locale].langShortName;
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
