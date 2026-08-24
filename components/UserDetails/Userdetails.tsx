"use client";
import react from "react";
import { useSession } from "next-auth/react";

export default function UserDetails() {
  const { data: session } = useSession();
  //console.log("Session data:", session);
  return (
    <div className="p-4 bg-white rounded w-full shadow-sm">
      {session ? (
        <div className="flex gap-2 font-black">
          <p>Welcome, {session.user?.name}!</p>
          <p>Email: {session.user?.email}</p>
        </div>
      ) : (
        <p>User is not logged in.</p>
      )}
    </div>
  );
}
