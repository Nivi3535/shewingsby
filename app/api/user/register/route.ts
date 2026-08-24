import api from "@/lib/Helper/helpexios";

const userData = {
  username: "Nivi",
  email: "nivi@gmail.com",
  password: "123456",
};

export async function GET() {
  console.log(
    "GET was called — something is hitting this via browser/nav, not fetch",
  );
  return new Response("This route only accepts POST", { status: 405 });
}

export async function POST(request: Request) {
  console.log(
    "POS^ was called — something is hitting this via browser/nav, not fetch",
  );
  const res = await api.post("/api/users/register", request.body);
  console.log(res.data);
}
