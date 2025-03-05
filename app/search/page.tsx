'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '@/types/item'
import MiniProduct from '@/components/widgets/MiniProduct';
import axios from 'axios';
import { server_url } from '@/components/Constant';
import { useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';

const ExplorePage = () => {

  const parms = useSearchParams();
  const [query,setQuery] = React.useState<string>(parms.get('key') || '');


  const [products,setProducts] = useState<Product[]>([]);

  const dispatch = useDispatch();
  
  useEffect(()=>{
    setQuery(parms.get('key') || '');
  },[parms])

  useEffect(()=>{
    dispatch({type:"LOADING"});
    axios.get(server_url+"/api/Product/deepsearch?query="+query)
    .then((response) => {
        console.log(response.data);
        setProducts(response.data);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(()=>{
        dispatch({type:"LOADED"});
    })
  },[query])

  return (
    <div className=" h-fit min-h-screen flex flex-col items-center justify-start bg-gray-50 p-4 ">
        <div className=' w-[60vw] h-fit bg-yellow-400 gap-2'>
          {
              products.map((products) => 
                  <MiniProduct {...products} key={products.id}/>
              ) 
          }

        </div>
          {products.length === 0 && 
            <div className=' w-full h-[78vh] flex items-center justify-center'>
              <h1 className=' text-4xl font-semibold text-gray-500'>⚠️ No Products Found</h1>
            </div>
          }  
    </div>
  )
}

// Sample product data using the new interface

export default ExplorePage