import { enDictionary } from "./en";
import { zhCnDictionary } from "./zh-cn";

export { DEFAULT_LOCALE, LOCALES, type Dictionary, type Principle, type SiteLocale } from "./types";

export const dictionaries = {
	"zh-cn": zhCnDictionary,
	en: enDictionary,
} as const;
