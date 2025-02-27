"use client"

import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import { User2, Mail, Phone, Calendar, Edit2, icons, Box } from 'lucide-react'
import Image from 'next/image'
import axios from 'axios'
import { server_url } from '@/components/Constant'
import ContainerLoader from '@/components/mini/ContainerLoader'
import { MdAddLocationAlt, MdLocationCity, MdLocationOn, MdOutlinePayments, MdOutlineSupportAgent, MdPayment, MdSecurity, MdSupportAgent } from 'react-icons/md'
import Link from 'next/link'
import { CgSupport } from 'react-icons/cg'

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: session?.user?.phone || ''
  })

  const  blocks : {
    icon: React.ReactNode,
    title: string,
    description: string,
    path : string
  }[] = [
    {
        icon: <MdSecurity size={70} className=' text-[#1d55c3]'/>,
        title: 'Update Credentials',
        description: 'Edit name,phone number,email and update password',
        path: '/credentials'
    }
    ,{
        icon: <Box className=' text-[#5e4f38]' size={50} />,
        title: 'Your Orders',
        description: 'See all your orders and track them',
        path: '/orders'
    }
    ,{
        icon: <MdLocationOn className=' text-[#1cb638]' size={50} />,
        title: 'Manage Address',
        description: 'Add,edit or delete your address',
        path: '/address'
    }
    ,{
        icon: <MdOutlinePayments className=' text-[#5a9ec1]' size={50} />,
        title: 'Payments Options',
        description: 'Add/Update card, netbanking or UPI details',
        path: '/payments'
    }
    ,{
        icon: <MdSupportAgent className=' text-[#141414]' size={50} />,
        title: 'Customer Support',
        description: 'Need help during your shopping journey or have any query',
        path: '/support'
    }
  ];


  if (status === 'loading') {
    return <ContainerLoader />
  }

  if (!session) {
    return null // or redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
           <div className=' bottom-0 right-0  fixed'>
            <div className=' relative top-0 overflow-hidden flex w-[300px] h-[300px] max-sm:w-36 max-sm:h-36'>
                <Image
                        src={'https://cdn-icons-png.flaticon.com/512/4090/4090532.png'}
                        alt="Profile"
                        fill
                        className="object-cover"
                    />
                </div>
           </div>
           <div className=' w-full mt-20 h-fit flex items-center justify-center'>
               <div className=' rounded-md h-fit space-y-3 flex  max-sm:items-start flex-wrap 
               max-sm:justify-center max-sm:w-[100vw] w-[65vw] gap-3  '>
                    {
                        blocks.map((ele,idx)=>
                            <Link key={ele.title + idx} href={ele.path}
                                className='flex items-center justify-center w-[340px] 
                                shadow-sm hover:cursor-pointer hover:shadow-md transition-all 
                                duration-500 bg-white rounded-md p-5  gap-4 bg-black/20'>
                                    {ele.icon}
                                    <div className=' flex flex-col gap-2'>
                                        <p className=' font-semibold text-xl'>{ele.title}</p>
                                        <p className=' text-[#8f8f8f]'>{ele.description}</p>
                                    </div>
                            </Link>
                        )
                    }
               </div>
           </div>
    </div>
  )
}

export default ProfilePage