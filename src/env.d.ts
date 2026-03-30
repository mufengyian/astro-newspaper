/// <reference types="astro/client" />

declare global {
	interface Window {
		__getNewspaperTheme?: () => string;
		__applyNewspaperTheme?: () => void;
		__setNewspaperTheme?: (preference: string) => void;
		__newspaperCopyCodeBound?: boolean;
		__newspaperSearchBound?: boolean;
		__newspaperThemeToggleBound?: boolean;
		__newspaperThemeChangeBound?: boolean;
		__newspaperReadingProgressBound?: boolean;
		__newspaperReadingProgressRefresh?: () => void;
		__newspaperBackToTopBound?: boolean;
		__newspaperWalineBound?: boolean;
		__newspaperWaline?: {
			destroy?: () => void;
		} | null;
	}
}

export {};
