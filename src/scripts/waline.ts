import { bindOnce, onPageLoad } from "./runtime";

function destroyWaline() {
	if (window.__newspaperWaline?.destroy) {
		window.__newspaperWaline.destroy();
	}

	window.__newspaperWaline = null;
}

export async function mountWaline() {
	destroyWaline();

	const root = document.querySelector("[data-waline-root='true']");
	if (!(root instanceof HTMLElement)) {
		return;
	}

	const thread = root.querySelector("[data-waline-thread]");
	if (!(thread instanceof HTMLElement)) {
		return;
	}

	const { init } = await import("@waline/client");
	window.__newspaperWaline = init({
		el: thread,
		serverURL: root.dataset.walineServer || "",
		path: root.dataset.walinePath || window.location.pathname,
		lang: root.dataset.walineLang || "zh-CN",
		dark: "html[data-theme='dark']",
		meta: (root.dataset.walineMeta || "nick,mail,link").split(",") as Array<
			"nick" | "mail" | "link"
		>,
		requiredMeta: (root.dataset.walineRequiredMeta || "nick,mail").split(",") as Array<
			"nick" | "mail" | "link"
		>,
		login: (root.dataset.walineLogin || "enable") as "enable" | "disable" | "force",
		commentSorting: (root.dataset.walineCommentSorting || "latest") as "latest" | "oldest",
		pageSize: Number(root.dataset.walinePageSize || "10"),
		reaction: root.dataset.walineReaction === "true",
	});
}

export function initWaline() {
	void mountWaline();
}

export function bindWalineLifecycle() {
	bindOnce("__newspaperWalineBound", () => {
		document.addEventListener("astro:before-swap", destroyWaline);
		onPageLoad(initWaline);
	});
}
