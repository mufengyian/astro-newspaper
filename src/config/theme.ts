export const themeConfig = {
	storageKey: "newspaper-theme",
	defaultPreference: "system",
	availablePreferences: ["system", "light", "dark"],
	metaColors: {
		light: "#f6efe4",
		dark: "#111827",
	},
} as const;

export type ThemePreference = (typeof themeConfig.availablePreferences)[number];

export function isThemePreference(value: string | null | undefined): value is ThemePreference {
	return Boolean(value && themeConfig.availablePreferences.includes(value as ThemePreference));
}
