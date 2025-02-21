'use client'

import { useParams, useSearchParams } from 'next/navigation'
import React, { Key, useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { server_url } from '@/components/Constant'
import ContainerLoader from '@/components/mini/ContainerLoader'
import { MediaType, Product } from '@/types/item'
import { ArrowLeftCircle, ArrowRightCircle } from 'lucide-react'
import VideoComponent from '@/components/VideoComponent'
import { useRouter } from 'next/navigation'
import { MdFullscreenExit } from 'react-icons/md'
import PopUp from '@/components/popups/PopUp'
import ImagesBlock from '@/components/widgets/DetailedProduct/ImagesBlock'
import DetailsCard from '@/components/widgets/DetailedProduct/DetailsCard'


const ProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('');
  const [fullImg, setFullImg] = useState<number>(-1);
  const isFullScreen = useSearchParams().get('fullscreen') === 'true';
  const router  = useRouter();
  const setFullScreen = () => {
    router.push('?fullscreen=true')
  }
  // useEffect(() => { console.log(fullImg) }, [fullImg])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${server_url}/api/Product/${id}`)
        setProduct(response.data)
      } catch (err) {
        setError('Failed to load product')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  useEffect(() => {
    const container = document.querySelector('.pre-show');
    const elements = container?.querySelectorAll('.scrlitem');
    if (fullImg >= -1 && elements && container) {
      const targetElement = elements[fullImg + 1];
      if (targetElement) {
        targetElement.scrollIntoView({
          // behavior: 'smooth',
          block: 'nearest',
          inline: 'end'
        });
      }
    }
  }, [fullImg]);

  
  useEffect(()=>{
    const handleEvent = (event:KeyboardEvent) => {
      if(isFullScreen && product){
        if(event.key === 'ArrowRight'){
          setFullImg(prev => prev >= product.media.length - 1 ? -1 : prev + 1)
        }else if(event.key === 'ArrowLeft'){
          setFullImg(prev => prev <= -1 ? product.media.length - 1 : prev - 1)
        }
      }
    }
    document.addEventListener('keydown', handleEvent);
    return () => {
      document.removeEventListener('keydown', handleEvent);
    };
  },[isFullScreen, product])

  if (loading) {
    return <ContainerLoader />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || 'Product not found'}</p>
      </div>
    )
  }
  const ToRigth = () =>{
    return (
      <div onClick={() => setFullImg(prev => prev >= product.media.length - 1 ? -1 : prev + 1)} 
        className='absolute h-[65%]  max-sm:h-[55%] top-20 group
        flex items-center justify-center w-14 bg-black/0 right-0'>
          <ArrowRightCircle className=' text-[#aeaeae] group-hover:text-[#7f48ff] active:scale-110
           transition-all hover:cursor-pointer' size={30} />
      </div>
    );
  }

  const ToLeft = () =>{
    return (
      <div onClick={() => setFullImg(prev => prev <= -1 ? product.media.length - 1 : prev - 1)} 
          className='absolute h-[65%]  max-sm:h-[55%] top-20 group
          flex items-center justify-center w-14 bg-black/0 left-0'>
          <ArrowLeftCircle className='text-[#aeaeae] group-hover:text-[#7f48ff] active:scale-110
           transition-all hover:cursor-pointer' size={30}/>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 ">
      {
        isFullScreen &&
        <PopUp  loading={false}>
              <ToLeft/>
              <ToRigth/>
              <div className=' select-none max-h-[88vh] bg-black/10'>
                  <div className=' h-fit w-full bg-black/0 flex items-center justify-center'>
                    {fullImg === -1 ?
                      <Image key={product.id}
                        src={product.imageLink || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                        alt={product.name}
                        width={4000}
                        height={5000}
                        className=" object-contain rounded-lg w-fit h-fit max-h-[88vh] group-hover:scale-105 
                        transition-transform duration-300"
                      />
                        :
                        (product.media[fullImg].type === MediaType.Photo ?
                          <Image
                            src={product.media[fullImg].link || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                            alt={product.name}
                            width={4000}
                            height={5000}
                            className=" object-center rounded-lg w-fit h-fit max-h-[88vh] group-hover:scale-105 transition-transform duration-300"
                          />
                          :
                          (product.media[fullImg].link.match(/youtube.com/) || product.media[fullImg].link.match(/youtu.be/)) ?
                          <div className=' min-w-[600px] max-sm:w-[85vw]  rounded-md overflow-hidden h-[100%] flex items-center z-50' 
                          dangerouslySetInnerHTML={{__html: product.media[fullImg].link}} />
                        :
                          <div className=' w-full min-w-[400px] flex h-fit items-center justify-center'>
                            <VideoComponent media={product.media[fullImg]}/>
                          </div> 
                        )
                      }
                  </div>  
              </div>            
        </PopUp>
      }    
      {/* <div className=' flex items-center max-w-screen overflow-x-auto justify-around w-full text-sm h-14 bg-black/20'>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
            <div className=' bg-white px-3 py-2 rounded'>Cartegory 1</div>
      </div> */}

      <div className=' flex w-full h-fit max-md:flex-col max-sm:gap-10'>
        <ImagesBlock
            product={product}
            fullImg={fullImg}
            setFullImg={setFullImg}
            ToLeft={ToLeft}
            ToRigth={ToRigth}
            setFullScreen={setFullScreen}
        />
        <DetailsCard product={product}/>
      </div>

      <div className=' flex w-full h-[300px] bg-red-400'>Similar matches</div>
      <div className=' flex w-full h-[600px] bg-blue-400'>Reviews</div>
      <div className=' flex w-full h-[200px] bg-green-400'>footer</div>
    </div>
  )
}

export default ProductPage
