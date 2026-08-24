"use client";
import { signOut } from "next-auth/react";
//import logoutAction from "./actions";

export default function Logout() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Logout</h1>

        <p className="mb-6 text-gray-600">
          Are you sure you want to log out of your account?
        </p>

        <button
          type="submit"
          onClick={() => signOut({ redirectTo: "/" })}
          className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-red-700 active:scale-95 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
