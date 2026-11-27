export function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // drop symbols like & ! '
    .replace(/[\s-]+/g, "-") // spaces or repeated hyphens -> one hyphen
    .replace(/^-+|-+$/g, ""); // no hyphen at the start or end
}
