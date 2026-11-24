// app/(app)/admin/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Admin from "@/components/Admin/Admin";

export default async function Page() {
  const session = await auth();

  //not logged in -> login page, logged in but not admin -> home page
  if (!session?.user) {
    redirect("/auth/login");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return <Admin />;
}
