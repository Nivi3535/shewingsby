export function createSlug(text: string) {
  return text.toLowerCase().trim().replace(/\s+/g, "-");
}
