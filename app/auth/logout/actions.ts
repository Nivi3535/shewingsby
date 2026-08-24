/* "use server";

import { signOut } from "@/lib/auth";

//import { redirect } from "next/navigation";

//anything in the server the import is from next/navigation
//react is only client
export default async function logoutAction() {
  // console.log("Logout action called");
  await signOut({
    redirectTo: "/",
  });

  //I tried await signout() without redierctTo it stays on the same page
  //i dont get to click OK on logout page without redirecting WHY ?
  //redirect("/");
  //Next implement on the navbar if the user.role is not Admin then hide
  //shield icon from navbar
}
 */
