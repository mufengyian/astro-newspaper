import Fuse from "fuse.js";
import { bindOnce, onPageLoad } from "./runtime";

interface SearchEntry {
	title: string;
	excerpt: string;
	category: string;
	tags: string[];
	url: string;
	publishedLabel: string;
	readingMinutesLabel: string;
	body: string;
}

type SearchResult = { item: SearchEntry };

type SearchMessages = {
	loading: string;
	matchesTemplate: string;
	emptyTitle: string;
	emptyDescription: string;
	unavailableTitle: string;
	unavailableDescription: string;
	openLabel: string;
	metaSeparator: string;
};

function formatTemplate(template: string, query: string, count: number) {
	return template.replace("__QUERY__", query).replace("__COUNT__", String(count));
}

export function initSearch() {
	const root = document.querySelector<HTMLElement>("[data-search-root]");
	if (!root || root.dataset.ready === "true") {
		return;
	}

	root.dataset.ready = "true";
	const input = root.querySelector<HTMLInputElement>("#search-input");
	const status = root.querySelector<HTMLElement>("[data-search-status]");
	const results = root.querySelector<HTMLElement>("[data-search-results]");
	const messagesNode = document.querySelector<HTMLScriptElement>("[data-search-messages]");

	if (!input || !status || !results || !messagesNode?.textContent) {
		return;
	}

	const messages = JSON.parse(messagesNode.textContent) as SearchMessages;
	const searchEndpoint = root.dataset.searchEndpoint || "/search.json";
	let activeIndex = 0;
	let fuse: Fuse<SearchEntry> | null = null;
	let loadPromise: Promise<void> | null = null;

	const setActive = (index: number) => {
		const items = Array.from(results.querySelectorAll<HTMLLIElement>("li"));
		if (items.length === 0) {
			return;
		}

		activeIndex = Math.max(0, Math.min(index, items.length - 1));
		items.forEach((item, itemIndex) => {
			item.classList.toggle("focus", itemIndex === activeIndex);
		});
	};

	const syncQuery = (query: string) => {
		const url = new URL(window.location.href);
		if (query) {
			url.searchParams.set("q", query);
		} else {
			url.searchParams.delete("q");
		}

		history.replaceState({}, "", url);
	};

	const clearResults = () => {
		status.hidden = true;
		results.hidden = true;
		status.textContent = "";
		results.replaceChildren();
		activeIndex = 0;
	};

	const createEmptyState = (title: string, description: string) => {
		const item = document.createElement("li");
		item.className = "search-empty";

		const strong = document.createElement("strong");
		strong.textContent = title;
		item.append(strong);

		const descriptionNode = document.createElement("p");
		descriptionNode.textContent = description;
		item.append(descriptionNode);

		return item;
	};

	const createResultItem = (item: SearchEntry, index: number) => {
		const resultItem = document.createElement("li");
		if (index === 0) {
			resultItem.classList.add("focus");
		}

		const titleNode = document.createElement("div");
		titleNode.className = "search-result-title";
		titleNode.textContent = item.title;
		resultItem.append(titleNode);

		const metaSegments = [item.publishedLabel, item.readingMinutesLabel];
		if (item.category) {
			metaSegments.push(item.category);
		}

		const metaNode = document.createElement("div");
		metaNode.className = "search-result-meta";
		metaNode.textContent = metaSegments.join(messages.metaSeparator);
		resultItem.append(metaNode);

		const excerptNode = document.createElement("p");
		excerptNode.className = "search-result-excerpt";
		excerptNode.textContent = item.excerpt;
		resultItem.append(excerptNode);

		const link = document.createElement("a");
		link.href = item.url;
		link.dataset.astroPrefetch = "hover";
		link.setAttribute("aria-label", messages.openLabel.replace("__TITLE__", item.title));
		resultItem.append(link);

		return resultItem;
	};

	const ensureIndex = async () => {
		if (fuse) {
			return;
		}

		if (!loadPromise) {
			loadPromise = (async () => {
				status.hidden = false;
				status.textContent = messages.loading;

				const response = await fetch(searchEndpoint, { credentials: "same-origin" });
				if (!response.ok) {
					throw new Error(`Unexpected response: ${response.status}`);
				}

				const entries = (await response.json()) as SearchEntry[];
				fuse = new Fuse(entries, {
					includeScore: true,
					threshold: 0.32,
					ignoreLocation: true,
					keys: [
						{ name: "title", weight: 0.45 },
						{ name: "excerpt", weight: 0.2 },
						{ name: "body", weight: 0.15 },
						{ name: "category", weight: 0.08 },
						{ name: "tags", weight: 0.12 },
					],
				});
			})();
		}

		await loadPromise;
	};

	const renderResults = (items: SearchResult[], query: string) => {
		status.hidden = false;
		results.hidden = false;

		status.textContent = formatTemplate(messages.matchesTemplate, query, items.length);

		if (items.length === 0) {
			results.replaceChildren(createEmptyState(messages.emptyTitle, messages.emptyDescription));
			activeIndex = 0;
			return;
		}

		results.replaceChildren(...items.map(({ item }, index) => createResultItem(item, index)));
		activeIndex = 0;
	};

	const runSearch = async (query: string) => {
		if (!query) {
			clearResults();
			return;
		}

		try {
			await ensureIndex();
			const matched = fuse ? (fuse.search(query).slice(0, 10) as SearchResult[]) : [];
			renderResults(matched, query);
		} catch (error) {
			console.error("[newspaper] Failed to load the search index.", error);
			status.hidden = false;
			results.hidden = false;
			status.textContent = messages.unavailableTitle;
			results.replaceChildren(
				createEmptyState(messages.unavailableTitle, messages.unavailableDescription),
			);
		}
	};

	input.addEventListener("input", () => {
		const query = input.value.trim();
		syncQuery(query);
		void runSearch(query);
	});

	input.addEventListener("keydown", (event) => {
		const items = Array.from(results.querySelectorAll<HTMLLIElement>("li"));
		if (items.length === 0) {
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActive(activeIndex + 1);
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			setActive(activeIndex - 1);
		}

		if (event.key === "Enter") {
			const link = items[activeIndex]?.querySelector<HTMLAnchorElement>("a");
			if (link) {
				event.preventDefault();
				link.click();
			}
		}
	});

	const initialQuery = new URL(window.location.href).searchParams.get("q")?.trim() ?? "";
	if (initialQuery) {
		input.value = initialQuery;
		void runSearch(initialQuery);
	} else {
		clearResults();
	}
}

export function mountSearch() {
	bindOnce("__newspaperSearchBound", () => {
		onPageLoad(initSearch);
	});
}
