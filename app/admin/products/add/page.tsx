'use client'

import React, { useState } from 'react'
import axios from 'axios'
import PageHeader from '@/components/widgets/PageHeader'
import { Save, ScanQrCode } from 'lucide-react'
import ContainerLoader from '@/components/mini/ContainerLoader'
import { server_url } from '@/components/Constant'


const AddProductPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState<string>("")
  const [error,setErr] = useState<string>();

  const Initialize = () => {
    setLoading(true);
    console.log(process.env.AUTH_SECRET)
    axios.post(server_url+"/api/product",{
      name : name
    })
    .then((res)=>{
      console.log(res.data);
      window.location.href = "/admin/products/edit/"+res.data['id'];
    })
    .catch((err)=>{
      setErr(err.response.data.message || "Something went wrong, Failed to initialize.");
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  }


  return (
    <>
      <PageHeader
        title='Edit Product' >
          <div className=' max-sm:hidden hover:cursor-not-allowed opacity-50 
              border font-semibold flex items-center justify-center 
                hover:shadow-lg transition-all shadow rounded p-2'>
                <ScanQrCode className='w-8 scale-50 h-8 text-black'/>
                <p>Scan to Fill Form</p>
            </div>
            <div className=' max-sm:hidden hover:cursor-not-allowed opacity-50 
              border font-semibold flex items-center justify-center 
              hover:shadow-lg transition-all shadow rounded p-2'>
                <Save className='w-8 scale-50 h-8 text-black'/>
                <p>Save Draft</p>
            </div>
            <div className=' border font-semibold border-[#e2e2e2] flex items-center justify-center 
            hover:cursor-pointer bg-[#e1f166] p-3 hover:shadow-lg transition-all shadow rounded '>
                <p>Save Product</p>
            </div>
        </PageHeader>

        <div className=' w-full h-[calc(100vh-155px)] bg-[#fafafa] flex pt-[10vh] justify-center '>
          { loading ?
            <ContainerLoader/>
              :
            <div className=' w-[400px] h-fit border hover:shadow-md transition-all
             bg-white rounded-md shadow-sm'>
              <div className=' w-full px-6 py-3 text-lg font-semibold text-[#182114]'>
                Initialize New Product
              </div>
              <hr />
              <div className=' p-6 pb-3'>
                <div className="space-y-2">
                <label htmlFor="productname" className="block text-sm font-medium text-gray-700">
                    Product Name
                </label>
                <input
                    autoComplete='off'
                    autoCapitalize='on'
                    autoCorrect='on'
                    type="text"
                    id="productname"
                    value={name}
                    onChange={(e) => setName(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1))}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-2 border focus:border-[1.4px] rounded-md outline-none transition-all`}
                  />
                </div>
                <div className=' w-full h-10 mt-5 flex items-end justify-end'>
                 { (name?.trim().length) > 0
                && <button onClick={Initialize} className=' px-3 py-2 font-semibold rounded-md active:scale-90
                hover:shadow-lg shadow-sm transition-all bg-[#e4f07b]'>
                        Initialize
                  </button>}
             </div>
                <p className=' text-red-700 h-10 mt-4'>{error}</p>
              </div>
            </div>}
        </div>
    </>
  )
}

export default AddProductPage
