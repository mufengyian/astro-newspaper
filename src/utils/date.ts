import { resolveLocale } from "./i18n";

const formatters = {
	"zh-cn": new Intl.DateTimeFormat("zh-CN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
	en: new Intl.DateTimeFormat("en", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}),
} as const;

export function formatDate(date: Date, locale?: string) {
	return formatters[resolveLocale(locale)].format(date);
}

export function formatMachineDate(date: Date) {
	return date.toISOString();
}
