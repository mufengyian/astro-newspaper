# 2026-03-31 Release Notes

This release focuses on correctness and resilience in the bilingual publishing flow, while also tightening a few client-side rendering and asset-loading details.

## Highlights

- Fixed locale routing so untranslated posts are no longer generated as duplicate pages under secondary locale paths.
- Hardened alternate metadata output and normalized `hreflang` values.
- Replaced search result `innerHTML` rendering with DOM-based rendering to reduce client-side injection risk.
- Isolated the standalone 404 page styles so they no longer leak into unrelated pages.
- Improved RSS fallback behavior when `PUBLIC_SITE_URL` is missing.
- Reduced unnecessary font payload in the default editorial preset by loading LXGW WenKai only when the WenKai preset is actually selected.

## Why It Matters

- Search engines now see cleaner canonical and alternate relationships.
- Users no longer land on synthetic localized pages that do not have real translated content.
- The default theme build avoids bundling a large Chinese font family when the editorial preset is active.
- Search rendering is safer and easier to maintain.

## Verification

- `npm run check`
- `PUBLIC_SITE_URL=https://example.com npm run build`
