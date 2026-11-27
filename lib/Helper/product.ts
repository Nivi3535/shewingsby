import Product from "@/types/Product";

//next: { tags } only works in server-side fetches.
//In the browser, force-cache just hands back the old list, which is why the list was stale after adding.
export async function getProduct(): Promise<Product[]> {
  const response = await fetch("/api/product", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(
      `Failed to fetch Product: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export async function postProduct(formdata: FormData): Promise<Product> {
  const response = await fetch("/api/product", {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Failed to save product");
  }

  return response.json();
}

export async function removeProduct(id: number): Promise<void> {
  const response = await fetch(`/api/product/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete product");
  }
}
