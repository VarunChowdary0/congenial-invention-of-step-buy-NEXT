"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const { status } = useSession();
  const router = useRouter();
  if (status !== "authenticated") {
    return (
      <button
        onClick={() => router.push("/api/auth")}
        className="text-black font-semibold flex hover:cursor-pointer
                hover:bg-[#2a2929] hover:text-white hover:ring-4
                hover:ring-[#6571e0] transition-all duration-300  max-sm:text-xs max-sm:py-3 max-sm:p-0 max-sm:ml-2
              px-3 py-1 bg-white rounded-md mr-3 max-sm:mr-2 "
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
