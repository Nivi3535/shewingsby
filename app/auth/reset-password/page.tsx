import ResetPassword from "./ResetPassword";

//
export default async function Page(props: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await props.searchParams;
  if (!token)
    return <p className="p-8">This reset link is missing its token.</p>;
  return <ResetPassword token={token} />;
}
