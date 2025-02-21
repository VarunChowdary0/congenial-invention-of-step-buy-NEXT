'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '@/types/item'
import MiniProduct from '@/components/widgets/MiniProduct';
import Filters from '@/components/widgets/Filters';
import axios from 'axios';
import { server_url } from '@/components/Constant';

const ExplorePage = () => {
    const [products,setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterProducts = () => {
    let filtered = [...products];
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.features.some(f => f.attribute === 'category' && f.value === selectedCategory)
      );
    }
    
    filtered = filtered.filter(product => product.price <= priceRange);
    
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  useEffect(()=>{
    axios.get(server_url+"/api/Product/all")
    .then((response) => {
        console.log(response.data);
        setProducts(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
  },[])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

          <Filters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}/>

      {/* Product Grid */}
    <div className='flex w-full gap-8'>
      <div className='h-screen w-[280px] bg-slate-900'></div>
        <div className=' flex-1 w-full flex flex-col gap-0'>
            {
                filterProducts().map((products) => 
                    <MiniProduct {...products} key={products.id}/>
                ) 
            }
        </div>
    </div>
    </div>
  )
}

// Sample product data using the new interface

export default ExplorePage