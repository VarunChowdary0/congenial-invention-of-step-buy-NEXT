'use client'

import React, { useEffect, useState } from 'react'
import { MediaType, Product } from '@/types/item'
import MiniProduct from '@/components/widgets/MiniProduct';
import Filters from '@/components/widgets/Filters';
import axios from 'axios';

const ExplorePage = () => {
    const [products,setProducts] = useState<Product[]>([]);
    // [
    //     {
    //       Id: '1',
    //       Title: 'ProGame Learning Kit',
    //       Rating: 4.5,
    //       ImageLink : "https://assets.bizclikmedia.net/668/29e544cc731dbf1b235e110461b25dfe:28a74bbe8cb6a13aaac3112de2d107de/jessica-lewis-deyfdybvqha-unsplash-jpg.webp",
    //       Quatity: 15,
    //       ActualPrice: 2999,
    //       Price: 2499,
    //       Discount: 17,
    //       Description: 'Complete programming learning kit for beginners',
    //       Media: [
    //         {
    //           Id: 'm1',
    //           Type: MediaType.Photo,
    //           Link: 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg'
    //         }
    //       ],
    //       Features: [
    //         {
    //           Id: 'f1',
    //           Attribute: 'category',
    //           Value: 'programming'
    //         }
    //       ],
    //       Reviews: [],
    //       productCategories: []
    //     },
    //   ];
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
    axios.get("http://localhost:5283/api/Product/all")
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