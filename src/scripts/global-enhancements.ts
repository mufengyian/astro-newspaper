import { mountBackToTop } from "./back-to-top";
import { mountCodeCopy } from "./copy-code";
import { mountThemeToggle } from "./theme-toggle";

export function mountGlobalEnhancements() {
	mountThemeToggle();
	mountBackToTop();
	mountCodeCopy();
}
