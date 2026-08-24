import Link from "next/link";
import Image from "next/image";

interface CategoryItemProps {
  name: string;
  imageUrl?: string | null; // renamed from href — see below
}

export default function CategoryItem({ name, imageUrl }: CategoryItemProps) {
  return (
    <Link href={`/category/${name.toLowerCase()}`} className="group block">
      <div
        className="relative aspect-square overflow-hidden"
        style={{ clipPath: "url(#scallop-clip)" }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200" />
        )}
      </div>
      <p className="mt-4 text-center font-serif text-xl">{name}</p>
    </Link>
  );
}
