import Image from "next/image";

type CategoryCardProps = {
  title: string;
  subtitle: string;
  image: string;
};

export default function CategoryCard({
  title,
  subtitle,
  image,
}: CategoryCardProps) {
  return (
    <div>
      <div className="bg-[#f9dede] rounded-xl p-6 shadow-md flex flex-col items-center">
        <h2 className="text-4xl font-light italic text-center">{title}</h2>

        <p className="text-gray-700 mt-2">{subtitle}</p>

        <div className="my-6 h-64 w-96">
          <Image
            src={image}
            alt={title}
            width={260}
            height={300}
            className="rounded-lg object-cover"
          />
        </div>

        <button
          className="bg-[#24382f] text-white
        px-8 py-3 rounded-md
        hover:bg-[#2f4a3d]
        transition"
        >
          SHOP NOW
        </button>
      </div>
    </div>
  );
}
