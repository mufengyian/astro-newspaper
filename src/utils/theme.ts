import { THEME_STORAGE_KEY } from "../config";

export function getThemeBootstrapScript() {
	return String.raw`(() => {
		const storageKey = ${JSON.stringify(THEME_STORAGE_KEY)};
		const root = document.documentElement;
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const getStoredPreference = () => {
			try {
				const value = localStorage.getItem(storageKey);
				return value === "light" || value === "dark" ? value : null;
			} catch (error) {
				console.warn("[newspaper] Failed to read theme preference.", error);
				return null;
			}
		};

		const resolveTheme = (preference) => {
			if (preference === "light" || preference === "dark") {
				return preference;
			}

			return mediaQuery.matches ? "dark" : "light";
		};

		const applyTheme = (preference, shouldNotify = false) => {
			const resolvedTheme = resolveTheme(preference);
			root.dataset.themePreference = preference || "system";
			root.dataset.theme = resolvedTheme;
			root.style.colorScheme = resolvedTheme;

			if (shouldNotify) {
				window.dispatchEvent(new CustomEvent("newspaper:themechange", { detail: resolvedTheme }));
			}
		};

		window.__getNewspaperTheme = () => root.dataset.theme || resolveTheme(getStoredPreference());
		window.__applyNewspaperTheme = () => {
			applyTheme(getStoredPreference());
		};
		window.__setNewspaperTheme = (preference) => {
			try {
				if (preference === "light" || preference === "dark") {
					localStorage.setItem(storageKey, preference);
				} else {
					localStorage.removeItem(storageKey);
				}
			} catch (error) {
				console.warn("[newspaper] Failed to persist theme preference.", error);
			}

			applyTheme(preference, true);
		};

		const handleSystemThemeChange = () => {
			if (getStoredPreference()) {
				return;
			}

			applyTheme(null, true);
		};

		if (typeof mediaQuery.addEventListener === "function") {
			mediaQuery.addEventListener("change", handleSystemThemeChange);
		} else if (typeof mediaQuery.addListener === "function") {
			mediaQuery.addListener(handleSystemThemeChange);
		}

		window.__applyNewspaperTheme();
	})();`;
}
