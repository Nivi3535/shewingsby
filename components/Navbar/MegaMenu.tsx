import Link from "next/link";
import MenuItem from "@/types/Menu";

interface MegaMenuProps {
  item: MenuItem;
  path: string[];
}

export default function MegaMenu({ item, path }: MegaMenuProps) {
  // Current item's path
  const currentPath = item.slug === "" ? path : [...path, item.slug];

  return (
    <div
      className="
        absolute
        left-0
        top-full
        hidden
        group-hover:block
        bg-white
        shadow-xl
        rounded-lg
        p-6
        min-w-125
        z-50
      "
    >
      <div className="grid grid-cols-2 gap-10">
        {item.children?.map((child) => {
          const childPath = [...currentPath, child.slug];
          const childHref = "/" + childPath.join("/");

          return (
            <div key={child.slug}>
              <Link href={childHref}>
                <h3 className="font-semibold text-pink-600 mb-3 hover:text-pink-700">
                  {child.title}
                </h3>
              </Link>

              <div className="space-y-2">
                {child.children?.map((subchild) => {
                  const subChildHref =
                    "/" + [...childPath, subchild.slug].join("/");

                  return (
                    <Link
                      key={subchild.slug}
                      href={subChildHref}
                      className="block hover:text-pink-500"
                    >
                      {subchild.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
