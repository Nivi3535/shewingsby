import Image from "next/image";
import type Product from "@/types/Product";
//import ProductDetail from "@/components/Product/ProductDetail";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}
/* interface ProductCardProps {
  product: ProductWithImagenumber;
} */
export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const handleSelect = (p: Product) => {
    console.log("Clicked", p.name);
    router.push(`/${p.slug}`);
  };
  const handleQuickView = (p: Product) => {
    console.log("Quick View", p.name);
    router.push(`/${p.id}`);
  };
  const image = product.image?.[0]?.image ?? "/placeholder-product.png";

  return (
    <article className="overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-lg">
      <div
        className="group overflow-hidden relative aspect-3/4 w-full rounded-lg transition hover:cursor-pointer hover:opacity-90"
        onClick={() => {
          handleSelect(product);
        }}
      >
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 hover:cursor-pointer group-hover:translate-y-0">
          <button
            onClick={() => {
              handleQuickView(product);
            }}
            className="w-full bg-white py-3 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 hover:cursor-pointer"
          >
            Quick View
          </button>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-sm font-medium">{product.name}</h3>

        <p className="text-lg font-semibold">₹{product.price}</p>
      </div>
    </article>
  );
}
