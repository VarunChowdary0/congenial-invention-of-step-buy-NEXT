import React, { useState } from 'react'
import SignOutButton from '../SignOutButton'
import { useSession } from 'next-auth/react';
import DropDownUser from './DropDownUser';

const NavBar = () => {
  const {data: session} = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-[#212189] shadow-sm sticky px-0 flex
     text-white items-center justify-center top-0 z-[1000] border-b">
      <div className="w-full bg-black/ px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Step Buy</h1>
          </div>
          
          <div className='bg-black/0 flex items-center justify-between gap-5'>
            {session ? (
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="p-3 cursor-pointer">
                  <p className='text-white text-xs w-32 text-wrap'>Hello,</p>
                  <p className='max-w-[150px] truncate text-sm'>{session.user.name}</p>
                </div>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <DropDownUser/>
                )}
              </div>
            )
            :
            <SignOutButton/>
            }
            <div className=' flex   font-thin hover:border-[1px] p-1 flex-col items-start gap-0
              hover:cursor-pointer relative'>
                  <p className='  p-0 text-xs  '>Orders</p>
                  <p className=' text-sm  '>& Deliveries</p>
            </div>
            <div className=' flex flex-col hover:border-[1px] p-1 items-center gap-0 hover:cursor-pointer relative'>
                  <p className=' p-0 text-xs text-[#ea9b3f] text-bold hover:scale-150 transition-all'>2</p>
                  <p className=' p-0 text-sm'>Cart</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar