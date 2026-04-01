import { bindOnce, onPageLoad } from "./runtime";

let activeBar: HTMLElement | null = null;
let activeArticle: HTMLElement | null = null;
let ticking = false;

function clamp(value: number) {
	return Math.min(1, Math.max(0, value));
}

function resolveTargets() {
	if (!activeBar || !document.body.contains(activeBar)) {
		activeBar = document.querySelector<HTMLElement>("[data-reading-progress]");
	}

	if (!activeArticle || !document.body.contains(activeArticle)) {
		activeArticle = document.querySelector<HTMLElement>(".post-single");
	}
}

function updateProgress() {
	resolveTargets();

	if (!activeBar) {
		ticking = false;
		return;
	}

	const scrollTop = window.scrollY;
	let progress = 0;

	if (activeArticle) {
		const start = activeArticle.offsetTop;
		const end = Math.max(start, start + activeArticle.offsetHeight - window.innerHeight);
		progress = end <= start ? Number(scrollTop >= start) : clamp((scrollTop - start) / (end - start));
	} else {
		const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
		progress = maxScroll <= 0 ? 0 : clamp(scrollTop / maxScroll);
	}

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
	resolveTargets();
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
