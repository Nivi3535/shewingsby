import menu from "@/data/navbarnew.json";
import AnnouncementBar from "./AnnouncementBar";
import NavbarItem from "./NavbarItem";
import NavbarIcons from "./NavbarIcons";
import Logo from "./Logo";
import Userdetails from "../UserDetails/Userdetails";

export default function Navbar() {
  return (
    <nav className="w-full shadow-sm">
      <AnnouncementBar></AnnouncementBar>
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        {/* Logo */}
        <div className="flex w-1/4  justify-start">
          <Logo />
        </div>

        <ul className="hidden flex-1 items-center gap-4 md:flex">
          {menu.map((item) => (
            <NavbarItem key={item.slug || item.title} item={item} path={[]} />
          ))}
        </ul>
        <div className="flex w-1/3 justify-end">
          <NavbarIcons />
        </div>
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
        <Userdetails></Userdetails>
      </div>
    </nav>
  );
}
