'use client'

import { SessionProvider as Provider } from "next-auth/react"
import SignOutButton from "./SignOutButton"


export default function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-[#eca232] shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold">Step Buy</h1>
              </div>
              <SignOutButton />
            </div>
          </div>
        </nav>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </Provider>
  )
}