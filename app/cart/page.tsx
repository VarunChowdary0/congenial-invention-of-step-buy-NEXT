'use client'

import { Cart, CartItem, ItemStatus } from '@/types/logistics'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Image from 'next/image'
import { BadgeInfoIcon, FlagIcon, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { formatPrice, server_url } from '@/components/Constant'
import Link from 'next/link'
import { div } from 'framer-motion/client'
import { CartActions } from '@/redux/reducer'

const CartPage = () => {
  const cart: Cart = useSelector((state: any) => state.cart)
  const dispatch = useDispatch()
  const router = useRouter();


  const UpdateItem = async (item:CartItem) => {
    dispatch({type : "LOADING"})
    const payload:CartItem = {
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      status: item.status
    }
    console.log(payload)
    axios.put(server_url+"/api/cart",item)
    .then((res)=>{
      console.log(res);
      if(item.quantity === 0){
        dispatch({ 
          type: CartActions.DELETE_CART_ITEM, 
          payload: item
        })
      }
      else{
        dispatch({ 
          type: CartActions.UPDATE_CART_ITEM, 
          payload: item
        })
      }
    })
    .catch((err)=>{
        console.log(err);
    })
    .finally(()=>{
        console.log('done');
    dispatch({type : "LOADED"})
    })
  }

  const getTotalPrice = () => {
    return formatPrice(cart.CartItems.reduce((total, item) => 
      total + ((item.product?.actualPrice || 0) * item.quantity), 0
    ))
  }
  const getTotalDiscountPrice = () => {
    return formatPrice(cart.CartItems.reduce((total, item) => 
      total + ((item.product?.price || 0) * item.quantity), 0
    ))
  }
  
  const getSavingPrice = () => {
    return formatPrice(cart.CartItems.reduce((total, item) => 
      total + ((((item.product?.actualPrice || 0) - (item.product?.price || 0))) * item.quantity), 0
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>
        {!cart.CartItems.some(item => item.status === ItemStatus.Default) ? (
          <div className="text-start px-10 max-sm:text-center py-12">
            <p className="text-gray-500 flex gap-2">
              <span>
                <BadgeInfoIcon/>  
              </span> Your cart is empty</p>
          </div>
        )
         : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.CartItems.map((item) => (
                ( (item.product && item.status === ItemStatus.Default)  && 
                 <div key={item.productId} 
                     className=" relative bg-white justify-between max-sm:justify-start p-4 rounded-lg shadow-sm flex gap-4">
                  <div className="relative min-w-24 h-24">
                   <Link href={`/product/${item.product.id}`}>
                      <Image
                          src={item.product?.imageLink || "/images/placeholder.png"}
                          alt={item.product?.name || "Image"}
                          fill
                          className="object-cover rounded-md"
                        />
                    </Link>
                  </div>
                  <div className=" max-w-[60%]">
                    <Link href={`/product/${item.product.id}`}>
                      <h3 className="font-semibold text-xl">{item.product?.name}</h3>
                      <p className=' max-h-[30px] max-sm:hidden truncate'>{item.product?.description}</p>
                    </Link>
                    <div className=' min-w-[150px]  max-sm:flex  items-start justify-start hidden flex-col h-[1] bg-black/0'>
                        <p className=' text-lg font-semibold'>{formatPrice(item.product.price)}</p>
                        <div className=' flex gap-2 text-sm max-sm:flex-col'>
                            <del className=' text-[#a7a7a7]'>{formatPrice(item.product.actualPrice)}</del>
                            <p className=' text-green-600 font-semibold'>{item.product.discount}% off</p>
                        </div>
                        <div className=' mt-2 text-sm absolute right-3 top-14 '>
                            {item.product.stock > item.product.lowStockAlertThreshold ?
                            <div className=' px-1 bg-green-100 border-2 border-green-800 w-fit rounded-sm'>In Stock</div>
                            :  
                            <p className='text-orange-600'>Only {item.product.stock} Left</p>
                          }
                        </div>
                  </div>
                    <div className="flex items-center gap-4 mt-4 max-sm:pb-10">
                      <div className="flex px-2 max-sm:absolute right-2 bottom-4 rounded-full border-2 items-center gap-0">
                        <div
                          onClick={() => UpdateItem({...item, quantity: Math.max(item.quantity - 1,0)})}
                          className="p-1 rounded-md"
                        >
                          { item.quantity > 1 ?
                            <div className=' p-1 rounded hover:scale-105 hover:font-bold active:scale-125 transition-all'>
                              <Minus className="w-4 h-4" />
                            </div>
                            :
                            <button
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 className="w-5 h-4" />
                              </button>
                          }
                        </div>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => UpdateItem({...item, quantity: item.quantity + 1})}
                          className="p-1 rounded-md hover:scale-105 hover:font-bold active:scale-125 transition-all"
                        >
                           <div className=' p-1 rounded '>
                              <Plus className="w-4 h-4" />
                            </div>
                        </button>
                      </div>
                      <div className=' w-full max-sm:absolute left-4 max-sm:gap-2 bottom-4 flex items-center gap-5'>
                        <span onClick={()=>
                          UpdateItem({...item, quantity : 0 })
                        } className=' flex text-xs items-center  gap-2 bg-black text-white 
                      py-1 hover:text-black hover:bg-white hover:cursor-pointer transition-all 
                      duration-300 border-2 px-3 rounded-full active:scale-90 select-none'>
                          <Trash2 className="text-red-500 hover:text-red-600" width={16}/>
                          Delete
                        </span>
                        <span onClick={()=>
                          UpdateItem({...item, status: ItemStatus.SaveForLater})
                        } className=' group flex items-center justify-center  px-3 py-1 text-xs gap-2
                         font-semibold text-white bg-[#f6c94c] rounded-full hover:text-[#f6c94c]  
                         transition-all duration-300 active:scale-90 active:text-white active:bg-[#f6c94c]
                          hover:bg-white hover:cursor-pointer  border-2'>
                          <FlagIcon className="text-[#fff] group-hover:text-[#000]" width={16}/>
                            Save for later
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className=' min-w-[150px]  max-sm:hidden  items-start justify-start flex flex-col px-5 h-[1] bg-black/0'>
                        <p className=' text-lg font-semibold'>{formatPrice(item.product.price)}</p>
                        <div className=' flex gap-2 text-sm max-sm:flex-col'>
                            <del className=' text-[#a7a7a7]'>{formatPrice(item.product.actualPrice)}</del>
                            <p className=' text-green-600 font-semibold'>{item.product.discount}% off</p>
                        </div>
                        <div className=' mt-2 text-sm'>
                            {item.product.stock > item.product.lowStockAlertThreshold ?
                            <div className=' px-1 bg-green-100 border-2 border-green-800 w-fit rounded-sm'>In Stock</div>
                            :  
                            <p className='text-orange-600'>Only {item.product.stock} Left</p>
                          }
                        </div>
                  </div>
                </div>)
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>{getTotalPrice()}</span>
                </div>
                <div className=" text-teal-600 flex justify-between">
                  <span>Total Savings</span>
                  <span>- {getSavingPrice()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{getTotalDiscountPrice()}</span>
                </div>
              </div>
              
              <button
                onClick={() => router.push('/checkout')}
                className="w-full mt-6 bg-black text-white py-2 rounded-lg
                         hover:bg-white hover:text-black border-2 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}

        { cart.CartItems.some(item => item.status === ItemStatus.SaveForLater) &&
          <>
            <h1 className="text-2xl font-bold my-8">Saved for later</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.CartItems.map((item) => (
                    ( (item.product && item.status === ItemStatus.SaveForLater)  && 
                    <div key={item.productId} 
                        className=" relative bg-white justify-between max-sm:justify-start p-4 rounded-lg shadow-sm flex gap-4">
                      <div className="relative min-w-24 h-24">
                      <Link href={`/product/${item.product.id}`}>
                          <Image
                              src={item.product?.imageLink || "/images/placeholder.png"}
                              alt={item.product?.name || "Image"}
                              fill
                              className="object-cover rounded-md"
                            />
                        </Link>
                      </div>
                      <div className=" max-w-[60%]">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-semibold text-xl">{item.product?.name}</h3>
                          <p className=' max-h-[30px] max-sm:hidden truncate'>{item.product?.description}</p>
                        </Link>
                        <div className=' min-w-[150px]  max-sm:flex  items-start justify-start hidden flex-col h-[1] bg-black/0'>
                            <p className=' text-lg font-semibold'>{formatPrice(item.product.price)}</p>
                            <div className=' flex gap-2 text-sm max-sm:flex-col'>
                                <del className=' text-[#a7a7a7]'>{formatPrice(item.product.actualPrice)}</del>
                                <p className=' text-green-600 font-semibold'>{item.product.discount}% off</p>
                            </div>
                            <div className=' mt-2 text-sm absolute right-3 top-14 '>
                                {item.product.stock > item.product.lowStockAlertThreshold ?
                                <div className=' px-1 bg-green-100 border-2 border-green-800 w-fit rounded-sm'>In Stock</div>
                                :  
                                <p className='text-orange-600'>Only {item.product.stock} Left</p>
                              }
                            </div>
                      </div>
                        <div className="flex items-center max-sm:pb-10  gap-4 mt-4">
                          <div className="flex px-2 max-sm:absolute right-2 bottom-4 rounded-full border-2 items-center gap-0">
                            <div
                              onClick={() => UpdateItem({...item, quantity: Math.max(item.quantity - 1,0)})}
                              className="p-1 rounded-md"
                            >
                              { item.quantity > 1 ?
                                <div className=' p-1 rounded hover:scale-105 hover:font-bold active:scale-125 transition-all'>
                                  <Minus className="w-4 h-4" />
                                </div>
                                :
                                <button
                                    className="text-red-500 hover:text-red-600"
                                  >
                                    <Trash2 className="w-5 h-4" />
                                  </button>
                              }
                            </div>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => UpdateItem({...item, quantity: item.quantity + 1})}
                              className="p-1 rounded-md hover:scale-105 hover:font-bold active:scale-125 transition-all"
                            >
                              <div className=' p-1 rounded '>
                                  <Plus className="w-4 h-4" />
                                </div>
                            </button>
                          </div>
                          <div className=' w-full max-sm:absolute left-4 max-sm:gap-2 bottom-4 flex items-center gap-5'>
                            <span onClick={()=>
                              UpdateItem({...item, quantity : 0 })
                            } className=' flex text-xs items-center  gap-2 bg-black text-white 
                          py-1 hover:text-black hover:bg-white hover:cursor-pointer transition-all 
                          duration-300 border-2 px-3 rounded-full active:scale-90 select-none'>
                              <Trash2 className="text-red-500 hover:text-red-600" width={16}/>
                              Delete
                            </span>
                            <span onClick={()=>
                              UpdateItem({...item, status: ItemStatus.Default})
                            } className=' group flex items-center justify-center  px-3 py-1 text-xs gap-2
                            font-semibold text-white bg-[#f6c94c] rounded-full hover:text-[#f6c94c]  
                            transition-all duration-300 active:scale-90 active:text-white active:bg-[#f6c94c]
                              hover:bg-white hover:cursor-pointer  border-2'>
                              <ShoppingCart className="text-[#fff] group-hover:text-[#000]" width={16}/>
                                Move to Cart
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className=' min-w-[150px]  max-sm:hidden  items-start justify-start flex flex-col px-5 h-[1] bg-black/0'>
                            <p className=' text-lg font-semibold'>{formatPrice(item.product.price)}</p>
                            <div className=' flex gap-2 text-sm max-sm:flex-col'>
                                <del className=' text-[#a7a7a7]'>{formatPrice(item.product.actualPrice)}</del>
                                <p className=' text-green-600 font-semibold'>{item.product.discount}% off</p>
                            </div>
                            <div className=' mt-2 text-sm'>
                                {item.product.stock > item.product.lowStockAlertThreshold ?
                                <div className=' px-1 bg-green-100 border-2 border-green-800 w-fit rounded-sm'>In Stock</div>
                                :  
                                <p className='text-orange-600'>Only {item.product.stock} Left</p>
                              }
                            </div>
                      </div>
                    </div>)
                  ))}
                </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default CartPage