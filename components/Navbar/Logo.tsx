import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/headerlogo.png"
        alt="Logo"
        width={120}
        height={60}
        className="h-14 w-auto object-contain"
      />
    </Link>
  );
}
