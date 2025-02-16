import { Product } from "@/types/item";
import React from 'react';
import { Star, Heart, Package, Shield, Truck } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';

const MiniProduct: React.FC<Product> = ({
    id,
    name,
    rating,
    imageLink,
    actualPrice,
    price,
    discount,
    description,
    stock,
    features,
    reviews,
    categories
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row border rounded-lg shadow-sm hover:shadow-md transition-all duration-300 bg-white w-full max-w-3xl p-4 gap-4"
    >
      {/* Product Image Section */}
      <div className="relative w-full md:w-48 h-48 flex-shrink-0 group">
        <Image
          src={imageLink || '/images/placeholder.jpg'}
          alt={name}
          fill
          className="object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {discount}% OFF
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="flex-1 space-y-3">
        {/* Title and Wishlist */}
        <div className="flex justify-between items-start">
          <Link href={`/product/${id}`} className="group">
            <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
          </Link>
          <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500 transition-colors" />
        </div>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2">
          <span className="bg-green-600 text-white px-2 py-1 rounded flex items-center text-sm">
            {rating} <Star className="w-4 h-4 fill-white ml-1" />
          </span>
          <span className="text-gray-600 text-sm">
            {reviews.length.toLocaleString()} Ratings
          </span>
        </div>

        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">₹{price.toLocaleString()}</span>
            {discount > 0 && (
              <>
                <span className="text-gray-500 line-through text-sm">
                  ₹{actualPrice.toLocaleString()}
                </span>
                <span className="text-green-600 text-sm font-medium">
                  {discount}% off
                </span>
              </>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="text-sm text-gray-600 space-y-1">
          {features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              {feature.attribute}: {feature.value}
            </li>
          ))}
        </ul>

        {/* Delivery and Stock Info */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Truck className="w-4 h-4 text-blue-600" />
            <span>Free Delivery</span>
          </div>
          {stock < 10 && (
            <div className="flex items-center gap-2 text-sm text-red-600">
              <Package className="w-4 h-4" />
              <span>Only {stock} left in stock!</span>
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Price and Actions */}
      <div className="md:w-48 space-y-3 flex flex-col items-end justify-between">
        <div className="space-y-2">
          <p className="text-sm text-green-700 font-medium">Bank Offer</p>
          <p className="text-xs text-gray-600">Up to ₹7,700 Off on Exchange</p>
        </div>

        <button 
          className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                     transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={stock === 0}
        >
          {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
};

export default MiniProduct;