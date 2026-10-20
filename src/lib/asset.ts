// Root for files in /public. Empty for the real site; "." for the relative-path
// preview build (see scripts/build-preview.mjs).
export const ASSET_BASE = process.env.NEXT_PUBLIC_ASSET_BASE ?? '';
export const asset = (path: string) => `${ASSET_BASE}${path}`;
