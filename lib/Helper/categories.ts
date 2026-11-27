import { Category } from "@/types/categories";

export async function getCategory(): Promise<Category[]> {
  const response = await fetch("/api/category", { cache: "no-store" });

  if (!response.ok) {
    console.log(response.status);
    console.log(await response.text());

    throw new Error("Failed to fetch categories");
  }

  return response.json();
}

export async function saveCategory(formData: FormData): Promise<Category> {
  const response = await fetch("/api/category", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to save category");
  }

  return response.json();
}

export async function deleteCategory(id: string): Promise<void> {
  const response = await fetch(`/api/category`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });
  if (!response.ok) {
    throw new Error("Failed to delete category");
  }
}
