"use client";

import { useEffect } from "react";
import { useCategoryStore } from "@/stores/categoryStore";
import CategoryItem from "./CategoryItem";
import { scallopPath } from "@/lib/Helper/scallop";

export default function UICategories() {
  const { loading, categories, error, loadCategory } = useCategoryStore();

  useEffect(() => {
    loadCategory();
  }, [loadCategory]);

  return (
    <section className="py-20 bg-[#fbf3e4]">
      {/* hidden SVG holding the clip-path shape — put it once here, not inside CategoryItem */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <clipPath id="scallop-clip" clipPathUnits="objectBoundingBox">
            <path d={scallopPath} />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-6xl text-center font-serif mb-16">
          Our Categories
        </h2>

        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          {!loading &&
            !error &&
            categories.map((item) => (
              <CategoryItem
                key={item.id}
                name={item.name}
                imageUrl={item.image}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
// //here categories is being loaded from sectiondata json
// // but now i have the data json in data.ts and the type is from type folder
// // next data.json is read and stored in stores through api
// // rremoving this part and do what ?
// // setting category data in store so import that
// // import { categories } from "./CategorySectionData";
// "use client";

// import { useEffect } from "react";
// import { useCategoryStore } from "@/stores/categoryStore";
// import CategoryItem from "./CategoryItem";

// export default function Categories() {
//   const { loading, categories, error, loadCategory } = useCategoryStore();

//   useEffect(() => {
//     loadCategory();
//   }, [loadCategory]);
//   return (
//     <section className="py-20 bg-[#fbf3e4]">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-6xl text-center font-serif mb-16">
//           Our Categories
//         </h2>

//         {loading && <div>Loading...</div>}
//         {error && <div>{error}</div>}

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
//           {!loading &&
//             !error &&
//             categories.map((item) => (
//               <CategoryItem
//                 key={item.id}
//                 title={item.title}
//                 image={item.image}
//               />
//             ))}
//         </div>
//       </div>
//     </section>
//   );
// }
