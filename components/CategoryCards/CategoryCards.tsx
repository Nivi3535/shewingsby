import CategoryCard from "./CategoryCard";
import { categoryData } from "./CategoryData";

export default function CategoryCards() {
  return (
    <section className="bg-[#fdf5e8] py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {categoryData.map((item) => (
          <CategoryCard
            key={item.title}
            title={item.title}
            subtitle={item.subtitle}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
}
