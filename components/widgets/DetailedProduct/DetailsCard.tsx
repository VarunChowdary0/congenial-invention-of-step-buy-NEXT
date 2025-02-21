import { Product } from '@/types/item';
import React from 'react'
// import AllWidth from '../Boots/AllWidth';
import StarIcon0 from '@/components/icons/StarIcon';
import { Car, KeyRound, ShoppingCart, Star } from 'lucide-react';
import { FaBuysellads, FaRupeeSign } from 'react-icons/fa';

interface curr {
    product : Product;
}

const DetailsCard:React.FC<curr> = ({product}) => {
  return (
    <div className='w-[60%] flex flex-col gap-5 max-md:w-full 
    bg-slate-700/0 px-5 max-sm:py-5 py-20'>
        {/* <AllWidth/> */}
        <div className='w-full h-fit flex flex-col gap-3 bg-slate-50'>
            <h1 className='text-4xl font-semibold'>{product.name}</h1>
            <pre className='text-2xl font-light text-wrap font-sans whitespace-pre-wrap'>
                {product.description}
            </pre>
            <div className=' relative flex fill-red-500  items-center justify-start gap-1'>
                <p className=' pt-[2px] text-xl font-semibold'>{product.rating}</p>
                <div className=' relative flex bg-slate-600/0 gap-2 items-center justify-center'>
                    <div className={`flex z-20   bg-slate-500/0 bg-black overflow-hidden 
                        w-[${Math.floor(26 * product.rating)}px] 
                        rounded-md`}>
                        <StarIcon0/>
                        <StarIcon0/>
                        <StarIcon0/>
                        <StarIcon0/>
                        <StarIcon0/>
                    </div>
                    <div className={`flex z-0 absolute left-0 bg-slate-500/0 bg-black overflow-hidden  
                        rounded-md`}>
                        <Star color='grey' className='w-[26px]'/>
                        <Star color='grey' className='w-[26px]'/>
                        <Star color='grey' className='w-[26px]'/>
                        <Star color='grey' className='w-[26px]'/>
                        <Star color='grey' className='w-[26px]'/>
                    </div>
                </div>
                <p className=' pt-[4px]  absolute left-[180px] bg-black/0'>Reviews {product.reviews.length}</p>
            </div>
        </div>
        <hr />
        <div className=' w-full h-20 bg-black/0 font-semibold'>
            <div className=' flex flex-col gap-2'>
                <div className='flex items-center gap-1 text-3xl'>
                    <span>₹</span>  
                    <h1>{product.price}</h1>
                    <div className=' bg-teal-600/20 scale-75 text-teal-800 border border-teal-800 hover:cursor-pointer 
                    text-lg ml-2 rounded px-2 py-1 mt-1'>
                            {product.discount}% off
                    </div>
                </div>
                <div className=''>
                    <del className=' text-lg text-[#a5a5a5]'>₹ {product.actualPrice}</del>
                </div>
            </div>
        </div>

        <div className=' w-full flex h-20 max-sm:flex-col gap-2 max-sm:relative 
        max-sm:top-0 sticky top-[100px] bg-white/0 rounded-md'>
            <div className=' flex items-center justify-center  px-16 py-3 text-lg
             gap-4 font-semibold text-white bg-black rounded-full hover:text-black 
             transition-all duration-500 active:scale-95 active:text-white active:bg-black
              hover:bg-white hover:cursor-pointer max-sm:w-full
              border-2 w-fit'>
                <span>
                    <ShoppingCart size={20}/>
                </span>
                <span>Add to Cart</span>
            </div>
            <div className=' flex items-center justify-center  px-16 py-3 text-lg
             gap-4 font-semibold text-white bg-[#f6c94c] rounded-full hover:text-[#f6c94c] 
             transition-all duration-500 active:scale-95 active:text-white active:bg-[#f6c94c]
              hover:bg-white hover:cursor-pointer 
              border-2 w-fit max-sm:w-full'>
                <span>
                    {/* <FaBuysellads size={20}/> */}
                </span>
                <span>Buy now</span>
            </div>
        </div>
        
        <div className=' w-full h-fit bg-slate-500/0 mt-[70px]'>
            <h1 className=' text-lg font-semibold'>Product features</h1>
            <div className=''>
                <div className=' w-full h-fit'>
                    {
                        product.features.map((feature, index) => (
                            <div key={index} className=' flex gap-2 items-start'>
                                <div className=' min-w-[200px] w-[200px] flex items-center gap-2'>
                                    <KeyRound color='green' size={20}/>
                                    <span>{feature.attribute}</span>
                                </div>
                                <div className=' text-wrap'>
                                    <span>{feature.value}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        
        <div className=' w-full h-fit bg-slate-500/0 mt-[20px]'>
            <h1 className=' text-lg font-semibold'>Categories</h1>
            <div className=' mt-4'>
                <div className=' w-full h-fit flex flex-wrap gap-5'>
                    {
                        product.categories.map((category, index) => (
                            <div className=' flex items-center px-6 text-lg font-semibold text-white py-2
                             rounded-full bg-indigo-500 gap-2'>
                                {category.name}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    </div>
  )
}

export default DetailsCard