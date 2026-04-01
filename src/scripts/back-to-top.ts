import { bindOnce, onPageLoad } from "./runtime";

function handleClick() {
	window.scrollTo({ top: 0, behavior: "smooth" });
}

export function initBackToTop() {
	let activeButton = document.querySelector<HTMLButtonElement>("[data-top-link]");

	const syncButton = () => {
		const nextButton = document.querySelector<HTMLButtonElement>("[data-top-link]");
		if (nextButton === activeButton) {
			return;
		}

		activeButton?.removeEventListener("click", handleClick);
		activeButton = nextButton;
		activeButton?.addEventListener("click", handleClick);
	};

	const toggleVisibility = () => {
		if (!activeButton || !document.body.contains(activeButton)) {
			syncButton();
		}

		if (!activeButton) {
			return;
		}

		activeButton.classList.toggle("is-visible", window.scrollY > 520);
	};

	syncButton();
	toggleVisibility();
	bindOnce("__newspaperBackToTopBound", () => {
		window.addEventListener("scroll", toggleVisibility, { passive: true });
	});
}

export function mountBackToTop() {
	onPageLoad(initBackToTop);
}
