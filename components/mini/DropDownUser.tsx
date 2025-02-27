import React from 'react'
import SignOutButton from '../SignOutButton'
import Link from 'next/link'
import { Boxes, Settings2, UserCheck2 } from 'lucide-react'

const DropDownUser:React.FC = () => {
  return (
    <div className="absolute z-[1202] max-sm:mt-3 max-sm:border max-sm:shadow-md
     right-0 mt-0 w-48 bg-white rounded shadow-lg p-2">
        <Link 
            href="/profile" 
            className=" flex items-center  gap-3 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
        >
            <span><UserCheck2/></span>
            <span>Profile</span>
        </Link>
        <Link 
            href="/orders" 
            className=" flex items-center  gap-3 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
        >
            <span><Boxes/></span>
            <span>Orders
            <p className=' hidden max-md:block'>
                & Deliveries
            </p></span>
        </Link>
        <Link 
            href="/settings" 
            className=" flex items-center  gap-3 px-4 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
        >
            <span><Settings2/></span>
            <span>Settings</span>
        </Link>
        <div className="border-t w-full flex items-end justify-end mt-3 border-gray-100">
            <SignOutButton/>
        </div>
    </div>
  )
}

export default DropDownUser