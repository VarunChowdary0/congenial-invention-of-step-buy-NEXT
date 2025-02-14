import React from 'react'
import SignOutButton from '../SignOutButton'
import Link from 'next/link'

const DropDownUser:React.FC = () => {
  return (
    <div className="absolute right-0 mt-0 w-48 bg-white rounded shadow-lg p-2 z-50">
        <Link 
            href="/profile" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Profile
        </Link>
        <Link 
            href="/orders" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Orders
        </Link>
        <Link 
            href="/settings" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
            Settings
        </Link>
        <div className="border-t w-full flex items-end justify-end mt-3 border-gray-100">
            <SignOutButton/>
        </div>
    </div>
  )
}

export default DropDownUser