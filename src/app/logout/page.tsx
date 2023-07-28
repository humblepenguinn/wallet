"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";


export default function Logout() {
  const router = useRouter();
  const { status, data } = useSession();

  React.useEffect(() => {
    if (status === "authenticated") {
      signOut();
      router.push("/login");
    }
  }, [status]);

  return <div></div>
}
