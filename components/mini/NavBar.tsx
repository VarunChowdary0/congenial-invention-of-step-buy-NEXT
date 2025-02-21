'use client'

import React, { JSX, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import SignOutButton from '../SignOutButton'
import { useSession } from 'next-auth/react';
import DropDownUser from './DropDownUser';
import Link from 'next/link';
import { MdAdminPanelSettings as AdminIcon } from 'react-icons/md';
import {  useRouter } from 'next/navigation';
import ContainerLoader from './ContainerLoader';
import { CommandIcon, Pencil, Search, ShoppingCartIcon, User, X } from 'lucide-react';
import Logo from '../icons/Logo';
import PopUp from '../popups/PopUp';
import { SearchResult } from '@/types/search'
import debounce from 'lodash/debounce'
import axios from 'axios';
import { common_operation,operations, operations_admin, server_url } from '../Constant';
import { UserType } from '@/types/personal';



const NavBar = () => {

  const {data: session, status} = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  console.log(session,status);
  const [showSearch,setShowSearch] = useState<boolean>(false);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult>({
    operations: session ? (session.user.role == UserType.Admin ? operations_admin: operations) : common_operation,
    products: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const performSearch = debounce(async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ operations: [], products: [] })
      return
    }
    setIsLoading(true)
    // Filter operations
    const matchedOperations = (session?.user?.role === UserType.Admin ? operations_admin : operations).filter(op => 
      op.title.toLowerCase().includes(query.toLowerCase()) ||
      op.description.toLowerCase().includes(query.toLowerCase())
    );
    // Fetch products from API
    axios.get(`${server_url}/api/product/deepsearch/?query=${query}`)
    .then((res)=>{
        console.log(res.data)
        setSearchResults({
        operations: matchedOperations,
        products: res.data
          })
    })
    .catch( (error) => {
      console.error('Error searching products:', error)
    }) 
    .finally(()=>{ 
      setIsLoading(false);
    });
  }, 300);

  const encrypt = (text: string) => {
    const res = encodeURI(text);
    console.log("en: ", res);
    return res;
  };
  
  useEffect(()=>{
    console.log(searchResults);
    if(searchResults.products.length === 0 && 
      searchResults.operations.length === 0 &&
      searchInput.current?.value.trim() === ""){
        setSearchResults({
          operations: session ? (session.user.role == UserType.Admin ? operations_admin: operations) : common_operation,
          products: []
        })
      }
      console.log(searchResults.products);
  },[searchResults,showSearch]);
  useEffect(()=>{
    setSearchResults({
      operations: session ? (session.user.role == UserType.Admin ? operations_admin: operations) : common_operation,
      products: []
    });
  },[status,session])

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.ctrlKey) {
        event.preventDefault();
        console.log('search');
        setShowSearch(true);
      }
      if (event.key === 'Control') {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  useEffect(()=>{
    if(showSearch && searchInput.current){
      searchInput.current.focus();
    }
  },[showSearch]);


  const SearchCard = () => {
    if (isLoading) {
      return <div className="w-full text-white p-4 flex justify-center">
        <ContainerLoader />
      </div>
    }
  
  
    return (
      <div className="space-y-4">
        {/* Operations Section */}
        {searchResults?.operations?.length > 0 && (
          <div className="space-y-2">
        <p className="text-xs text-gray-400 px-3">Operations</p>
        {searchResults.operations.map(op => (
          <Link onClick={()=>setShowSearch(false)} href={op.action} key={op.id} >
            <div
            key={op.id}
            className="flex items-center gap-3 p-3 hover:bg-[#2a2929] 
              cursor-pointer rounded-sm group"
          >
            <div className="text-gray-400 group-hover:text-white">
          {op.icon}
            </div>
            <div>
          <p className="text-sm text-gray-200">{op.title}</p>
          <p className="text-xs text-gray-400">{op.description}</p>
            </div>
          </div>
          </Link>
        ))}
          </div>
        )}
      
        {/* Products Section */}
        {searchResults?.products?.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-gray-400 px-3">Products</p>
            { session?.user?.role === UserType.Admin ?
            searchResults.products.map(product => (
              <div 
                  key={encrypt(product.id)}
                  className="flex relative items-center gap-3 p-3 hover:bg-[#2a2929] 
                    cursor-pointer rounded-sm group"
                >
                  <div className="w-10 h-10 relative">
                <Image
                  src={product.imageLink}
                  alt={product.name}
                  fill
                  className="object-cover rounded"
                />
                </div>
                <div>
                <p className="text-sm text-gray-200">{product.name}</p>
                <p className="text-xs text-gray-400">
                  • ${product.price}
                </p>
            </div>
            <div
                onClick={()=>setShowSearch(false)} 
            className=' absolute right-3 flex gap-3'>
            <Link 
            className=' text-sky-600 hover:text-sky-200 text-sm transition-all inline-flex items-center gap-1'
              href={`/product/${product.id}`}>view</Link>
              <Link className=' text-indigo-600 hover:text-indigo-200 text-sm transition-all inline-flex items-center gap-1'
               href={`/admin/products/edit/${(product.id)}}`}>
              <span><Pencil className=' w-3'/></span>
              <span>Edit</span>
              </Link>
            </div>
          </div>
            ))
             :
             searchResults.products.map(product => (
              <Link href={`/product/${product.id}`}
              onClick={()=>setShowSearch(false)} 
                key={product.id}
                className="flex items-center gap-3 p-3 hover:bg-[#2a2929] 
                  cursor-pointer rounded-sm group"
              >
                <div className="w-10 h-10 relative">
              <Image
                src={product.imageLink}
                alt={product.name}
                fill
                className="object-cover rounded"
              />
                </div>
                <div>
              <p className="text-sm text-gray-200">{product.name}</p>
              <p className="text-xs text-gray-400">
                • ${product.price}
              </p>
            </div>
          </Link>
              ))}
          </div>
        )}
      
        {/* No Results */}
        {!isLoading && 
         (!searchResults?.operations?.length && !searchResults?.products?.length) && (
          <div className="text-center py-8">
        <p className="text-gray-400">No results found</p>
          </div>
        )}
      </div>
    )
  }  


  if(status === 'loading') {
    return <div className=' z-[1300] fixed top-0 left-0 right-0 bottom-0 
  bg-white flex items-center flex-col gap-5 justify-center'>
    <div><ContainerLoader/></div>
    <p className=' text-3xl font-semibold text-[#20493c] '>
      Step buy
    </p>
  </div>
  }
  return (
    <nav className="bg-[#ffffff] max-w-screen shadow-sm sticky px-0 flex
     text-black items-center justify-center top-0 z-[1000] ">
      {showSearch && 
          <PopUp dark loading={false} onClose={()=>setShowSearch(false)} >
            <div className=' relative pr-1 rounded-lg shadow-lg max-sm:w-[80vw] bg-[#191919] w-[510px] overflow-hidden max-h-[347px]'>
              <div className=' absolute right-0 left-0 bg-[#191919] overflow-hidden  flex text-[#a1a1a9] top-0 w-full p-3'>
                      <Search className=' w-5 '/>
                      <input ref={searchInput} className='ml-2 font-sans tracking-[0.2px] w-[85%] text-[14px] outline-none bg-transparent' 
                           onChange={(e) => performSearch(e.target.value)}
                         placeholder='Type a command or search..' type="text" />
                      <button  
                        onClick={()=>setShowSearch(false)}
                        className='absolute right-3' >
                        <X  className=' w-4 hover:text-white hover:cursor-pointer'/>
                      </button>
              </div>
              <hr className='border-[0.5px] mt-[50px] mb-1 border-[#2e2e2e] '/>
              <div className=' w-full overflow-y-auto h-[300px] '>
                <div className=' w-full h-fit flex gap-4 px-3 py-4 flex-col'>
                  <SearchCard/>
                </div>
              </div>
            </div>
          </PopUp>
      }
      <div className="w-full bg-black/ px-4 max-sm:px-0 max-sm:pr-2 sm:px-6 lg:px-8">
        <div className="flex justify-between h-14 items-center">
          <div className="flex-shrink-0 flex items-center justify-center gap-2">
          <Link href='/'>
              <div className=' flex items-center justify-center'>
                <div className='  mt-2'>
                  <Logo h={55} w={55}/>
                </div>
                <h1 className="text-xl font-bold">Step Buy</h1>
                </div>
              {/* <h1 className="text-xl font-bold">Step Buy</h1> */}
            </Link>
            <div>
            </div>
          </div>

          <div className=' max-sm:hidden flex-1 h-full flex items-center justify-end mr-3
          '>
              <div onClick={()=>setShowSearch(true)} className=' w-full ring-0 h-9 border-[1.4px] rounded-lg 
                 font-medium text-black
              bg-[#ffffff] hover:bg-[#2a2929]
               hover:cursor-pointer hover:ring-4 
                hover:ring-[#6571e0] duration-300
               outline-none max-w-[250px]  hover:text-white flex items-center
                justify-between px-2 transition-all'>
                  <p className=' flex max-md:text-sm  text-md items-center justify-center gap-1'>
                    <Search className=' w-4'/>
                    Search Products..
                  </p>
                  <div className='text-[#e2e2e2] flex hover:cursor-pointer bg-[#2a2929] gap-[2px]
                   text-xs items-center justify-center  px-2 py-[4px] rounded'>
                    <CommandIcon className='h-3 w-3 '/>
                    <span className=' font-light'>K</span>
                  </div>
              </div>  
          </div>      
          <div className=' hidden flex-1 h-full max-sm:flex items-center justify-end
          '>
              <div onClick={()=>setShowSearch(true)} className=' ring-0 h-9 border-[1.4px] rounded-lg 
                 font-medium text-black w-9
              bg-[#ffffff] hover:bg-[#2a2929]
               hover:cursor-pointer hover:ring-4 
                hover:ring-[#6571e0] duration-300
               outline-none hover:text-white flex items-center
                justify-between px-2 transition-all'>
                    <Search className=' w-4'/>
              </div>  
          </div>      

          <div className='bg-black/0 flex items-center justify-between max-sm:gap-0 gap-1'>
            {session?.user?.role === UserType.Admin && (
              <div 
              onClick={() => router.push('/admin')}
              className=" text-black font-semibold flex hover:cursor-pointer
                hover:bg-[#2a2929] hover:text-white hover:ring-4
                hover:ring-[#6571e0] transition-all duration-300
              px-3 py-1 bg-white rounded-md">
                <AdminIcon className="w-6 h-6"/>
                Admin
              </div>
            )}
            {session ? (
             <>
               <div 
                className="relative max-sm:hidden "
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-3 cursor-pointer">
                  <p className=' text-xs w-fit max-w-32 text-wrap'>Hello,</p>
                  <p className='max-w-[150px] truncate font-semibold'>{session.user.name}</p>
                </div>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <DropDownUser/>
                )}
              </div>
              <div className=' relative px-[7px] hidden max-sm:block'
              >
                <div className='text-black font-semibold flex hover:cursor-pointer
                hover:bg-[#2a2929] hover:text-white hover:ring-4
                hover:ring-[#6571e0] transition-all duration-300
              px-3 py-1 bg-white rounded-md'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="h-6 w-6"/>
                </div>
                {isDropdownOpen && (
                  <DropDownUser/>
                )}          
                </div>
             </>
            )
            :
            <SignOutButton/>
            }
            <div className=' flex max-md:hidden  rounded-md font-thin
             hover:bg-[#2a2929] hover:text-white  
               hover:ring-4 hover:ring-[#6571e0] transition-all duration-300
             px-1 flex-col items-start gap-0
              hover:cursor-pointer relative'>
                  <p className='  p-0 text-xs  '>Orders</p>
                  <p className=' font-semibold '>& Deliveries</p>
            </div>
            <div className='text-black font-semibold flex hover:cursor-pointer
                hover:bg-[#2a2929] hover:text-white hover:ring-4
                hover:ring-[#6571e0] transition-all duration-300
              px-2 bg-white rounded-md relative'>
                  <ShoppingCartIcon className="h-6 w-6" />
                  <span className="absolute top-1 right-[12px] bg-green-500 text-white rounded-full 
                   w-4 h-4
                   flex items-center justify-center text-xs">
                    5
                  </span>
                  <span className=' mt-3 font-semibold'>Cart</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar