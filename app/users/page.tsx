"use client";

import { useState } from "react";
interface UserForm {
  username: string;
  email: string;
  password: string;
}

export default function Page() {
  const [username, setUserName] = useState("");
  const [form, setForm] = useState<UserForm >({
    name: "",
    slug: "",
    description: "",
    image: "",
    parentId: "",
  });
  const handleClick = async () => {
    try {
      const res = await fetch("/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });

      if (res) {
        console.log(res);
      }
    } catch (error) {
      console.error("registration failed", error);
    }
  };

  return (
    <div>
      user page
      <input
        type="text"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      ></input>
      <button onClick={handleClick}>Register</button>
    </div>
  );
}
