import { bindOnce, onPageLoad } from "./runtime";

function nextTheme(current: string) {
	return current === "dark" ? "light" : "dark";
}

function getNextThemeLabel(button: HTMLButtonElement, state: string) {
	return state === "dark" ? button.dataset.themeLight || "Light mode" : button.dataset.themeDark || "Dark mode";
}

export function updateThemeToggleButtons() {
	const state =
		window.__getNewspaperTheme?.() || document.documentElement.dataset.themePreference || "light";

	document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
		const nextLabel = getNextThemeLabel(button, state);
		const currentLabel = state === "dark" ? button.dataset.themeDark : button.dataset.themeLight;
		const currentTemplate = button.dataset.themeCurrent || "Switch theme, current setting: __CURRENT__";

		button.setAttribute("aria-label", currentTemplate.replace("__CURRENT__", currentLabel || nextLabel));
		button.setAttribute("title", nextLabel);
	});
}

export function initThemeToggle() {
	window.__applyNewspaperTheme?.();

	document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]").forEach((button) => {
		if (button.dataset.bound === "true") {
			return;
		}

		button.dataset.bound = "true";
		button.addEventListener("click", () => {
			const current =
				window.__getNewspaperTheme?.() ||
				document.documentElement.dataset.themePreference ||
				"light";
			window.__setNewspaperTheme?.(nextTheme(current));
			updateThemeToggleButtons();
		});
	});

	updateThemeToggleButtons();
}

export function mountThemeToggle() {
	bindOnce("__newspaperThemeToggleBound", () => {
		onPageLoad(initThemeToggle);
	});

	bindOnce("__newspaperThemeChangeBound", () => {
		window.addEventListener("newspaper:themechange", updateThemeToggleButtons);
	});
}
