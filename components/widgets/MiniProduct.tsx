import { Product } from "@/types/item";
import React from 'react'
import { Star, Heart } from "lucide-react"; 



const MiniProduct:React.FC<Product> = ({
    id,
    name,
    rating,
    imageLink,
    actualPrice : ActualPrice,
    price,
    discount,
    description,
    stock: Quatity,
    media,
    features,
    reviews,
    categories
}) => {
  return (
    <>
    <div className="flex border p-4 rounded shadow-md bg-white w-full max-w-3xl">
      {/* Product Image */}
      <div className="w-48 h-48 flex-shrink-0">
        <img src={imageLink} alt={name} className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Product Details */}
      <div className="ml-4 flex-1">
        {/* Title and Wishlist */}
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{name}</h3>
          <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center mt-1">
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md flex items-center">
            {rating} <Star className="w-3 h-3 fill-white ml-1" />
          </span>
          <span className="text-gray-500 text-sm ml-2">2,948 Ratings & {reviews.length} Reviews</span>
        </div>

        {/* Features */}
      
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          {features.map((feature, idx) => (
            <li key={idx}>{feature.attribute} | {feature.value}</li>
          ))}
        </ul>
        {/* <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>8 GB RAM | 256 GB ROM | Expandable Upto 1 TB</li>
          <li>17.22 cm (6.78 inch) Full HD+ Display</li>
          <li>108MP + 2MP + AI Lens | 8MP Front Camera</li>
          <li>5000 mAh Lithium-ion Battery</li>
        </ul> */}
      </div>

      {/* Pricing and Offers */}
      <div className="text-right">
        <p className="text-xl font-bold text-black">₹{price}</p>
        <p className="text-gray-500 line-through">₹{ActualPrice}</p>
        <p className="text-green-600 text-sm font-semibold">{discount}% off</p>
        <p className="text-sm text-gray-500">Free delivery</p>
        <p className="text-green-700 text-sm font-semibold">Up to ₹7,700 Off on Exchange</p>
      </div>
    </div>
    </>
)  

    }

export default MiniProduct;



        // <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        // <motion.div
        //     key={id}
        //     initial={{ opacity: 0, y: 20 }}
        //     animate={{ opacity: 1, y: 0 }}
        //     className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        // >
        //     <div className="relative h-48">
        //     <Image
        //         src={imageLink || '/images/placeholder.jpg'}
        //         alt={"Image of " + name}
        //         fill
        //         className="object-cover"
        //     />
        //       {discount > 0 &&  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
        //         {discount}% OFF
        //         </div>}
        //     </div>
        //     <div className="p-4">
        //     <div className="flex items-center gap-2 mb-2">
        //         <h3 className="font-semibold text-lg flex-1">{name}</h3>
        //         <div className="flex items-center bg-green-50 px-2 py-1 rounded-md">
        //         <span className="text-sm text-green-700">{rating}★</span>
        //         </div>
        //     </div>
        //     <p className="text-gray-600 text-sm mb-3">{description}</p>
        //     <div className="flex justify-between items-center">
        //         <div className="space-y-1">
        //         <div className="flex items-center gap-2">
        //             <span className="text-lg font-bold">₹{price}</span>
        //             {discount > 0 && (
        //             <span className="text-sm text-gray-500 line-through">₹{ActualPrice}</span>
        //             )}
        //         </div>
        //         {Quatity < 10 && (
        //             <p className="text-xs text-red-500">Only {Quatity} left!</p>
        //         )}
        //         </div>
        //         <button 
        //         className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        //         disabled={Quatity === 0}
        //         >
        //         {Quatity === 0 ? 'Out of Stock' : 'Add to Cart'}
        //         </button>
        //     </div>
        //     </div>
        // </motion.div>
        // </div>);
