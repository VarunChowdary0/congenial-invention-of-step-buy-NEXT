import { MediaType, Product } from '@/types/item';
import React from 'react'
import { MdFullscreenExit } from 'react-icons/md';
import Image from 'next/image'
import VideoComponent from '@/components/VideoComponent';
import { p } from 'framer-motion/client';

interface curr{
    fullImg : number;
    setFullScreen :()=>void;
    ToLeft : React.FC;
    ToRigth : React.FC;
    product : Product;
    setFullImg : React.Dispatch<React.SetStateAction<number>>;
}
const ImagesBlock:React.FC<curr> = (props) => {
  return (
    <div className=' select-none flex flex-col items-center gap-5 justify-center min-h-[800px] max-sm:min-h-[600px]
        sticky max-md:relative top-[50px] max-sm:py-0 py-10 max-sm:p-0 flex-1 h-fit bg-slate-300/0 mx-10  '>
              <div onClick={props.setFullScreen} className=' rounded-full duration-500 bg-white
              hover:cursor-pointer transition-all border hover:scale-105 shadow-[#d3ce8c] shadow-md
               hover:bg-[#242424] hover:text-white absolute top-14 right-5'>
                <MdFullscreenExit className=' w-6 h-6'/>
              </div>
              <props.ToLeft />
              <props.ToRigth />
              <div className=' max-sm:h-[400px] h-[510px] w-full bg-black/0 flex items-center justify-center'>
              {props.fullImg === -1 ?
                <Image
                 key={props.product.id}
                  src={props.product.imageLink || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                  alt={props.product.name}
                  width={4000}
                  height={5000}
                  className="object-fit max-sm:max-h-[400px] rounded-lg w-fit h-full group-hover:scale-105 transition-transform duration-300"
                />
                :
                (props.product.media[props.fullImg].type === MediaType.Photo ?
                  <Image
                    src={props.product.media[props.fullImg].link || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                    alt={props.product.name}
                    width={4000}
                    height={5000}
                    className=" object-center rounded-lg w-fit h-fit group-hover:scale-105 transition-transform duration-300"
                  />
                  :
                  (props.product.media[props.fullImg].link.match(/youtube.com/) || props.product.media[props.fullImg].link.match(/youtu.be/)) ?
                  <div className=' min-w-[85%] rounded-md overflow-hidden h-[100%] flex items-center z-50' 
                  dangerouslySetInnerHTML={{__html: props.product.media[props.fullImg].link}} />
                :
                  <div className=' w-full flex h-fit items-center justify-center'>
                    <VideoComponent media={props.product.media[props.fullImg]}/>
                  </div> 
                )
              }
              </div>
            <div 
            className='w-[100%]  px-2 overflow-x-auto pre-show max-w-[600px] bg-black/0 h-[120px] flex items-center gap-4
             justify-start snap-x snap-mandatory '>
               <div onClick={()=>props.setFullImg(-1)} className={` h-[90px]  hover:cursor-pointer hover:scale-105 
               transition-all shadow-md snap-center scrlitem max-sm:h-[75px] flex items-center 
               justify-center min-w-[100px] bg-white 
               ${ props.fullImg === -1 && "ring-4  ring-[#6571e0]"}  rounded-md `}>
                    <Image key={props.product.id}
                            src={props.product.imageLink || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                            alt={props.product.name}
                            width={4000}
                            height={5000}
                      className="object-cover rounded-lg w-[85%] h-full group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
              {props.product.media.map((ele,idx)=>
                <div key={props.product.imageLink + idx} onClick={()=>props.setFullImg(idx)} className={` h-[90px]  hover:cursor-pointer hover:scale-105 
                transition-all shadow-md snap-center scrlitem max-sm:h-[75px] flex items-center 
                ${props.fullImg === idx ? " ring-4  ring-[#6571e0] scale-110":""} duration-500 justify-center min-w-[100px] bg-white rounded-md `}>
                    {
                      ele.type === MediaType.Photo ?
                      <Image key={ele.id}
                      src={ele.link || "https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                      alt={props.product.name}
                      width={4000}
                      height={5000}
                      className="object-cover rounded-lg w-full h-full group-hover:scale-105 
                      transition-transform duration-300"
                    />
                    :
                    
                    (ele.link.match(/youtube.com/) || ele.link.match(/youtu.be/)) ?
                    <div className=' min-w-[85%] rounded-md overflow-hidden h-[100%] flex items-center z-50' 
                    dangerouslySetInnerHTML={{__html: ele.link}} />
                  :
                    <div className=' w-full flex h-fit items-center justify-center'>
                      <VideoComponent media={ele}/>
                    </div> 
                    }
                </div>
              )}
            </div>
        </div>
  )
}

export default ImagesBlock