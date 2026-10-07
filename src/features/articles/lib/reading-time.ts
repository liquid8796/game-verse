/** Approximate reading time for the visible text in our editorial format. */
export function estimateReadingMinutes(body: string): number {
  const visibleText = body
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, "$1")
    .replace(/^##\s+/gm, "")
    .replace(/^-\s+/gm, "")
    .trim();
  const words = visibleText ? visibleText.split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 220));
}
