'use client'

import { SessionProvider as Provider } from "next-auth/react"
import NavBar from "./mini/NavBar";


const SessionProvider = ({ children }: { children: React.ReactNode }) => {

  return (
    <Provider>
      <div className="min-h-screen flex flex-col ">
        <NavBar />
        <div className=" h-10 w-full bg-slate-900">

        </div>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </Provider>
  )
}

export default SessionProvider;