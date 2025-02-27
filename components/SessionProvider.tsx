'use client'

import { SessionProvider as Provider } from "next-auth/react"
import NavBar from "./mini/NavBar";
import { useSelector } from "react-redux";
import ContainerLoader from "./mini/ContainerLoader";
import Footer from "./mini/Footer";
import { usePathname } from "next/navigation";

interface RootState {
  loader: {
    loading: boolean;
}
}


const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const itemLoad = useSelector((state:RootState) => state.loader.loading);
  const path = usePathname();
  return (
    <Provider>
      <div className="min-h-screen flex flex-col ">
        <NavBar />
        {/* {
          window.location.pathname.includes("admin") ? null : 
            <div className=" h-10 w-full bg-slate-900"></div>
        } */}
        {itemLoad &&
              <div className=' flex items-center justify-center bg-black/30 backdrop-blur-sm 
              z-[1300] fixed text-white top-0 left-0 right-0 bottom-0'>
                  <ContainerLoader></ContainerLoader>
              </div> 
        }
          <main className="flex-1">
            {children}
          </main>
          {! path.includes("admin") &&
              <Footer/>
          }
      </div>
    </Provider>
  )
}

export default SessionProvider;