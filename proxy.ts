import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  if (
    (pathname === "/api/category" ||
      pathname === "/api/category/[id]" ||
      pathname === "/api/product") &&
    (req.method === "POST" || req.method === "DELETE")
  ) {
    if (!user) {
      return NextResponse.json(
        { message: "Sign in required" },
        { status: 401 },
      );
    }

    if (user.role !== "ADMIN") {
      return NextResponse.json(
        { message: "Admin access required" },
        { status: 403 },
      );
    }
  }

  /*  if (pathname === "/api/account" && !user) {
    return NextResponse.json({ message: "Sign in required" }, { status: 401 });
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    } 

    if (user.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    } 
  }*/

  return NextResponse.next();
});

export const config = {
  matcher: ["/api/product", "/api/category", "/api/category/[id]"],
};
