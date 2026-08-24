import Link from "next/link";
import MenuItem from "@/types/Menu";
import MegaMenu from "./MegaMenu";

interface NavbarItemProps {
  item: MenuItem;
  path: string[];
}

export default function NavbarItem({ item, path }: NavbarItemProps) {
  const currentPath = item.slug === "" ? path : [...path, item.slug];

  const href = currentPath.length === 0 ? "/" : "/" + currentPath.join("/");

  return (
    <li className="relative group list-none">
      <Link
        href={href}
        className="px-3 py-2 block hover:text-pink-600 font-medium"
      >
        {item.title}
      </Link>

      {item.children && item.children.length > 0 && (
        <MegaMenu item={item} path={path} />
      )}
    </li>
  );
}
