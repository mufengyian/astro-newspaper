import { THEME_STORAGE_KEY } from "../config";

export function getThemeBootstrapScript() {
	return String.raw`(() => {
	const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
	const root = document.documentElement;

	const readPreference = () => {
		try {
			return localStorage.getItem(storageKey) || "light";
		} catch (error) {
			console.warn("[newspaper] Failed to read theme preference.", error);
			return "light";
		}
	};

	const applyTheme = (preference) => {
		root.dataset.themePreference = preference;
		root.dataset.theme = preference;
		root.style.colorScheme = preference;
	};

	window.__getNewspaperTheme = () => root.dataset.themePreference || readPreference();
	window.__applyNewspaperTheme = () => {
		applyTheme(readPreference());
	};
	window.__setNewspaperTheme = (preference) => {
		try {
			localStorage.setItem(storageKey, preference);
		} catch (error) {
			console.warn("[newspaper] Failed to persist theme preference.", error);
		}

		applyTheme(preference);
		window.dispatchEvent(new CustomEvent("newspaper:themechange", { detail: preference }));
	};

	window.__applyNewspaperTheme();
})();`;
}
