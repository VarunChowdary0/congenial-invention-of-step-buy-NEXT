"use client";


import { Product } from '@/types/item';
import React, { useEffect, useState } from 'react'
import StarIcon0 from '@/components/icons/StarIcon';
import { Check, KeyRound, ShoppingCart, Star } from 'lucide-react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { formatPrice, server_url } from '@/components/Constant';
import ContainerLoader from '@/components/mini/ContainerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { Cart, CartItem, ItemStatus } from '@/types/logistics';
import Link from 'next/link';

interface curr {
    product : Product;
}

const DetailsCard:React.FC<curr> = ({product}) => {

    const dispatch = useDispatch();
    const cart = useSelector((state: {cart : Cart}) => state.cart);
    const [isLoading , Setloading] = useState<boolean>(false);
    const [isInCart,setInCart] = useState(false);
    const {data} = useSession();

    useEffect(() => {
        cart.CartItems.map(
            (item: CartItem) => {
                console.log(item.productId, product.id)
                if(item.productId === product.id){
                    console.log('in cart',item.productId);
                    setInCart(true);
                    return;
                }
            }
        );
        // console.log(cart.CartItems)
    }, [product, cart.CartItems]);
    
    const addToCart = () => {
        Setloading(true);
        const payload = {
            productId: product.id,
            userId: data?.user.id,
            quantity: 1,
            status: ItemStatus.Default,
        }
        console.log('add to cart',payload);
          axios.post(server_url+"/api/cart",payload)
          .then((res)=>{
              console.log(res);
              dispatch({type: 'ADD_TO_CART', payload : payload});
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            Setloading(false);
        })
    }
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
                    <h1>{formatPrice(product.price)}</h1>
                    <div className=' bg-teal-600/20 scale-75 text-teal-800 border border-teal-800 hover:cursor-pointer 
                    text-lg ml-2 rounded px-2 py-1 mt-1'>
                            {product.discount}% off
                    </div>
                </div>
                <div className=''>
                    <del className=' text-lg text-[#a5a5a5]'>{formatPrice(product.actualPrice)}</del>
                </div>
            </div>
        </div>

        <div className=' bg-[#fafafa] pb-5 w-full flex pt-10 h-[140px] max-sm:flex-col gap-2 max-sm:relative 
        max-sm:top-0 select-none sticky top-[40px] rounded-md'>
           {
            isLoading ? 
            <div className=' w-full flex items-center justify-center'>
                <ContainerLoader/>
            </div>
            :
            <> {
                isInCart ? 
                <Link href='/cart' className=' h-full'>
                    <div  className="group flex h-full items-center justify-center px-16 py-3 text-lg
                        gap-4 font-semibold text-white bg-black rounded-full hover:text-black 
                        transition-all duration-500 active:scale-95 active:text-white active:bg-black
                        hover:bg-white hover:cursor-pointer max-sm:w-full min-w-[320px]
                        border-2 w-fit relative">
                        <div className="bg-green-600 rounded-full p-1 absolute top-0 right-0">
                            <Check size={15} />
                        </div>
                        <div className=' flex gap-2 items-center justify-center
                        group-hover:scale-125 duration-75 transition-all '>
                            <span>
                                <ShoppingCart size={20} className="" />
                            </span>
                            <span className="group-hover:hidden">Added to Cart</span>
                            <span className="hidden group-hover:block">View Item in Cart</span>
                        </div>
                    </div>
                </Link>

                :
                <div className=' group flex items-center justify-center  px-16 py-3 text-lg
                gap-4 font-semibold text-white bg-black rounded-full hover:text-black 
                transition-all duration-500 active:scale-95 active:text-white active:bg-black
                hover:bg-white hover:cursor-pointer max-sm:w-full
                border-2 w-fit' onClick={addToCart}>
                    <div className=' flex items-center justify-center gap-2 
                    group-hover:scale-125 duration-75 transition-all '>
                        <span>
                            <ShoppingCart size={20}/>
                        </span>
                        <span >Add to Cart</span>
                    </div>
                </div>
                }
                
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
            </>
           }
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
                            <div key={category.id+index} className=' flex items-center px-6 text-lg font-semibold text-white py-2
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