import Product from "@/types/Product";
import Image from "next/image";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="flex flex-col gap-4">
          {product.image && product.image.length > 0 ? (
            <>
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                {product.image[0].image ? (
                  <Image
                    src={product.image[0].image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No image available
                  </div>
                )}
              </div>
              {product.image.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.image.map((img) => (
                    <div
                      key={img.id}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                    >
                      {img.image ? (
                        <Image
                          src={img.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-200" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Home
            </a>
            <span>/</span>
            <a href={`/${product.category.id}`} className="hover:text-gray-900">
              {product.category.name}
            </a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Title */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {product.name}
            </h1>
          </div>

          {/* Price */}
          <div className="border-b pb-6">
            <p className="text-3xl font-bold text-green-600">
              ₹{product.price.toLocaleString("en-IN")}
            </p>
          </div>

          {/* Description */}
          {product.description && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
          )}

          {/* Stock Status */}
          <div>
            {product.stock > 0 ? (
              <p className="text-green-600 font-semibold">
                ✓ In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-semibold">Out of Stock</p>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            disabled={product.stock === 0}
            className={`py-3 px-6 rounded-lg font-semibold text-white transition ${
              product.stock > 0
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Add to Cart
          </button>

          {/* Additional Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Product ID: <span className="font-mono">{product.id}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
