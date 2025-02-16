'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, Edit3, Table } from 'lucide-react'
import { Product } from '@/types/item'
import axios from 'axios'
import { server_url } from '@/components/Constant'

const ProductsPage = () => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return
    setLoading(true)
    console.log("Sent")
    if (searchTerm.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/)){
        console.log("name")
        axios.get(`${server_url}/api/product/search/?id=${searchTerm}`)
        .then((res)=>{
            console.log(res)
            if(res.data.id){
                setSearchResults([res.data])
                setLoading(false)
              return
            }
            setSearchResults(res.data)
        })
        .catch( (error) => {
          console.error('Error searching products:', error)
        })
    }
    else{
        console.log("name")
        axios.get(`${server_url}/api/product/search/?name=${searchTerm}`)
        .then((res)=>{
            console.log(res)
            if(res.data.id){
                setSearchResults([res.data])
                setLoading(false)
              return
            }
            setSearchResults(res.data)
        })
        .catch( (error) => {
          console.error('Error searching products:', error)
        }) 
    }
      setLoading(false)
  }

  return (
    <div className="min-h-screen pt-32 max-sm:pt-16 bg-gray-50 p-6">
      <div className="max-w-7xl min-h-[600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Add Product Card */}
        <div 
          onClick={() => router.push('/admin/products/add')}
          className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6 cursor-pointer"
        >
          <div className="flex flex-col items-center justify-center h-[400px] space-y-4">
            <div className="w-16 h-16 hover:scale-105 bg-blue-100 rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8  text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <p className="text-gray-600 text-center">
              Create a new product listing with details, images, and features
            </p>
          </div>
        </div>

        {/* Edit Product Card */}
        <div className="bg-white border rounded-xl shadow-sm relative p-6">
            <div onClick={()=>{
            router.push('/admin/products/edit')
        }} className='  flex items-center justify-center absolute
            top-4 right-4 hover:cursor-pointer hover:scale-105 transition-all
              flex-col bg-indigo-600 text-white px-2 py-2 rounded-md text-sm font-medium'>
                <Table className='w-5 h-5'/>
                All Products 
            </div>
          <div className="flex flex-col h-[400px]">
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Edit3 className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold">Edit Product</h2>
              <p className="text-gray-600 text-center">
                Search by product name or ID to edit existing products
              </p>
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter product name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 
                           transition-colors disabled:bg-purple-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              <div className="overflow-y-auto max-h-[200px] space-y-2">
                {searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-600">ID: {product.id}</p>
                      </div>
                      <span className="text-purple-600">Edit →</span>
                    </div>
                  </div>
                ))}
              </div>

              {loading && (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage