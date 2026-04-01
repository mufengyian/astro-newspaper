import type Fuse from "fuse.js";
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

type FuseConstructor = typeof Fuse<SearchEntry>;

const searchIndexCache = new Map<string, Promise<SearchEntry[]>>();
let fuseImportPromise: Promise<{ default: FuseConstructor }> | undefined;

function formatTemplate(template: string, query: string, count: number) {
	return template.replace("__QUERY__", query).replace("__COUNT__", String(count));
}

function loadFuse() {
	if (!fuseImportPromise) {
		fuseImportPromise = import("fuse.js");
	}

	return fuseImportPromise;
}

function loadSearchIndex(searchEndpoint: string) {
	const cached = searchIndexCache.get(searchEndpoint);
	if (cached) {
		return cached;
	}

	const request = (async () => {
		const response = await fetch(searchEndpoint, { credentials: "same-origin" });
		if (!response.ok) {
			throw new Error(`Unexpected response: ${response.status}`);
		}

		return (await response.json()) as SearchEntry[];
	})();

	searchIndexCache.set(searchEndpoint, request);
	return request;
}

export function initSearch() {
	const root = document.querySelector<HTMLElement>("[data-search-root]");
	if (!root || root.dataset.ready === "true") {
		return;
	}

	root.dataset.ready = "true";
	const input = root.querySelector<HTMLInputElement>("[data-search-input]");
	const status = root.querySelector<HTMLElement>("[data-search-status]");
	const results = root.querySelector<HTMLElement>("[data-search-results]");
	const messagesNode = document.querySelector<HTMLScriptElement>("[data-search-messages]");

	if (!input || !status || !results || !messagesNode?.textContent) {
		return;
	}

	const messages = JSON.parse(messagesNode.textContent) as SearchMessages;
	const searchEndpoint = root.dataset.searchEndpoint || "/search.json";
	const resultLimit = Number(root.dataset.searchResultLimit || "10");
	const threshold = Number(root.dataset.searchThreshold || "0.32");
	let activeIndex = 0;
	let fuse: Fuse<SearchEntry> | null = null;
	let loadPromise: Promise<void> | null = null;
	let latestQuery = "";

	const setExpandedState = (isExpanded: boolean) => {
		input.setAttribute("aria-expanded", isExpanded ? "true" : "false");
	};

	const setActive = (index: number) => {
		const items = Array.from(results.querySelectorAll<HTMLLIElement>("li"));
		if (items.length === 0) {
			input.removeAttribute("aria-activedescendant");
			return;
		}

		activeIndex = Math.max(0, Math.min(index, items.length - 1));
		items.forEach((item, itemIndex) => {
			const isActive = itemIndex === activeIndex;
			item.classList.toggle("focus", isActive);
			item.setAttribute("aria-selected", isActive ? "true" : "false");
		});
		input.setAttribute("aria-activedescendant", items[activeIndex]?.id || "");
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
		setExpandedState(false);
		input.removeAttribute("aria-activedescendant");
	};

	const createEmptyState = (title: string, description: string) => {
		const item = document.createElement("li");
		item.className = "search-empty";
		item.setAttribute("role", "option");
		item.setAttribute("aria-selected", "false");

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
		const isActive = index === 0;
		resultItem.id = `search-result-${index}`;
		resultItem.setAttribute("role", "option");
		resultItem.setAttribute("aria-selected", isActive ? "true" : "false");
		if (isActive) {
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
				try {
					status.hidden = false;
					status.textContent = messages.loading;
					setExpandedState(true);

					const [{ default: FuseConstructor }, entries] = await Promise.all([
						loadFuse(),
						loadSearchIndex(searchEndpoint),
					]);

					fuse = new FuseConstructor(entries, {
						includeScore: true,
						threshold,
						ignoreLocation: true,
						keys: [
							{ name: "title", weight: 0.45 },
							{ name: "excerpt", weight: 0.2 },
							{ name: "body", weight: 0.15 },
							{ name: "category", weight: 0.08 },
							{ name: "tags", weight: 0.12 },
						],
					});
				} catch (error) {
					loadPromise = null;
					throw error;
				}
			})();
		}

		await loadPromise;
	};

	const renderResults = (items: SearchResult[], query: string) => {
		status.hidden = false;
		results.hidden = false;
		setExpandedState(true);
		status.textContent = formatTemplate(messages.matchesTemplate, query, items.length);

		if (items.length === 0) {
			results.replaceChildren(createEmptyState(messages.emptyTitle, messages.emptyDescription));
			activeIndex = 0;
			input.removeAttribute("aria-activedescendant");
			return;
		}

		results.replaceChildren(...items.map(({ item }, index) => createResultItem(item, index)));
		activeIndex = 0;
		input.setAttribute("aria-activedescendant", "search-result-0");
	};

	const runSearch = async (query: string) => {
		if (!query) {
			latestQuery = "";
			clearResults();
			return;
		}

		latestQuery = query;

		try {
			await ensureIndex();
			if (query !== latestQuery) {
				return;
			}

			const matched = fuse ? (fuse.search(query).slice(0, resultLimit) as SearchResult[]) : [];
			renderResults(matched, query);
		} catch (error) {
			if (query !== latestQuery) {
				return;
			}

			console.error("[newspaper] Failed to load the search index.", error);
			status.hidden = false;
			results.hidden = false;
			setExpandedState(true);
			status.textContent = messages.unavailableTitle;
			results.replaceChildren(
				createEmptyState(messages.unavailableTitle, messages.unavailableDescription),
			);
		}
	};

	input.addEventListener(
		"focus",
		() => {
			void ensureIndex();
		},
		{ once: true },
	);

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

		if (event.key === "Escape") {
			input.value = "";
			syncQuery("");
			clearResults();
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
