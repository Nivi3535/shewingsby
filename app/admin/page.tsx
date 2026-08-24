// app/product/page.tsx
import { auth } from "@/lib/auth";
import Admin from "@/components/Admin/Admin";

export default async function Page() {
  const session = await auth();

  return <Admin />;
}
