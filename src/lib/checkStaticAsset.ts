/** GLB files start with the ASCII magic bytes `glTF`. */
const GLB_MAGIC = [0x67, 0x6c, 0x54, 0x46] as const;

function hasGlbMagic(bytes: Uint8Array) {
  return GLB_MAGIC.every((value, index) => bytes[index] === value);
}

/**
 * Returns true only when a real GLB is available at `url`.
 * SPA fallbacks often respond with `index.html` (text/html) and HTTP 200 —
 * a plain HEAD + response.ok check is not enough and will crash GLTF loaders.
 */
export async function isGlbAvailable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url);
    if (!response.ok) return false;

    const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
    if (contentType.includes("text/html")) return false;

    const buffer = await response.arrayBuffer();
    if (buffer.byteLength < 4) return false;

    return hasGlbMagic(new Uint8Array(buffer.slice(0, 4)));
  } catch {
    return false;
  }
}

/**
 * Returns true when a static image/asset exists (not an SPA HTML fallback).
 */
export async function isStaticAssetAvailable(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) return false;

    const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
    return !contentType.includes("text/html");
  } catch {
    return false;
  }
}
