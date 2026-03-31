type WindowFlag = string;

function getWindowStore() {
	return window as unknown as Record<string, unknown>;
}

export function bindOnce(flag: WindowFlag, callback: () => void) {
	const windowStore = getWindowStore();
	if (windowStore[flag]) {
		return;
	}

	windowStore[flag] = true;
	callback();
}

export function onDocumentReady(callback: () => void) {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", callback, { once: true });
		return;
	}

	callback();
}

export function onPageLoad(callback: () => void) {
	document.addEventListener("astro:page-load", callback);
	onDocumentReady(callback);
}
