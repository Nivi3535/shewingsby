interface ProductToolbarProps {
  categoryName: string;
  totalProducts: number;
}

export default function ProductToolbar({
  categoryName,
  totalProducts,
}: ProductToolbarProps) {
  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-2xl font-semibold">{categoryName}</h1>

        <p className="text-sm text-gray-500">{totalProducts} Products</p>
      </div>

      <div>Sort Dropdown</div>
    </div>
  );
}
