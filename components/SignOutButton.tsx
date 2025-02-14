"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/auth"); // Redirect only when the session is fully unauthenticated
  //   }
  // }, [status, router]);

  if (status !== "authenticated") {
    return (
      <button
        onClick={() => router.push("/auth")}
        className="inline-flex items-center px-4 py-2 
        text-sm font-medium rounded-md text-white border-2 focus:border-none
        focus:outline-none focus:ring-2 focus:ring-offset focus:ring-green-500"
      >
        Sign In
      </button>
    )
  }

  return (
    <button
      onClick={() => signOut()}
      className="inline-flex items-center px-4 py-2 border border-transparent 
      text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Sign Out
    </button>
  );
}
