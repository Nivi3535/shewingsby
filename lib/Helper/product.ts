import Product from "@/types/Product";

export async function getProduct(): Promise<Product[]> {
  const response = await fetch("/api/product", {
    method: "GET",
    cache: "force-cache",
    next: {
      tags: ["products"],
      revalidate: 300,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error:", {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    });
    throw new Error(`Failed to fetch Product: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function postProduct(formdata: FormData): Promise<Product> {
  const response = await fetch("/api/product", {
    method: "POST",
    body: formdata,
  });

  if (!response.ok) {
    throw new Error("Failed to save Product");
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
