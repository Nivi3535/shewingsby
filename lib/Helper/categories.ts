import Category from "@/types/categories";

export async function getCategory(): Promise<Category[]> {
  const response = await fetch("/api/category");

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
    throw new Error("Failed to save category");
  }

  return response.json();
}

export async function deleteCategory(id: number): Promise<void> {
  const response = await fetch(`/api/category/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to save category");
  }
}
