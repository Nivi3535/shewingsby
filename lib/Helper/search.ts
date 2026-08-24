export async function searchProducts(keyword: string) {
  console.log(keyword);
  const response = await fetch(`/api/search?keyword=${keyword}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const clone = response.clone();

  console.log(await clone.text()); // Read the clone

  //const data = await response.json(); // Read the original
  //const data = await response.json();
  return response;
}
