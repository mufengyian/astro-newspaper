import { bindOnce, onPageLoad } from "./runtime";

let activeBar: HTMLElement | null = null;
let ticking = false;

function updateProgress() {
	if (!activeBar || !document.body.contains(activeBar)) {
		activeBar = document.querySelector<HTMLElement>("[data-reading-progress]");
	}

	if (!activeBar) {
		ticking = false;
		return;
	}

	const scrollTop = window.scrollY;
	const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
	const progress = maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, scrollTop / maxScroll));
	activeBar.style.transform = `scaleX(${progress})`;
	ticking = false;
}

function requestProgressUpdate() {
	if (ticking) {
		return;
	}

	ticking = true;
	window.requestAnimationFrame(updateProgress);
}

export function initReadingProgress() {
	activeBar = document.querySelector<HTMLElement>("[data-reading-progress]");
	requestProgressUpdate();
}

export function mountReadingProgress() {
	window.__newspaperReadingProgressRefresh = initReadingProgress;

	bindOnce("__newspaperReadingProgressBound", () => {
		window.addEventListener("scroll", requestProgressUpdate, { passive: true });
		window.addEventListener("resize", requestProgressUpdate);
		onPageLoad(initReadingProgress);
	});
}
