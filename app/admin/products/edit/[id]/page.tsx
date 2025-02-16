 'use client'

import React, { useState, useEffect, JSX } from 'react'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Product, Feature, Media, MediaType, MediaFor } from '@/types/item'
import { ScanQrCode, UploadIcon, Save, Maximize } from 'lucide-react'
import axios from 'axios'
import AddMedia from '@/components/popups/PopUp'
import PageHeader from '@/components/widgets/PageHeader'
import Collapse from '@/components/popups/Collpse'
import VideoComponent from '@/components/VideoComponent'
// import ExtreLabledInputNumber from '@/components/mini/ExtreLabledInputNumber'
import GeneralProductInfo from '@/components/widgets/GeneralProductInfo'
import FeatureManagement from '@/components/widgets/FeatureManagement'
import ContainerLoader from '@/components/mini/ContainerLoader'
import { server_url } from '@/components/Constant'
import CategoryManagement from '@/components/widgets/CategoryManagement'

const EditProductPage = () => {

  const params = useParams().id; 
  const router = useRouter()
  const searchParams = useSearchParams()
  const add_media = searchParams.get('add_media')
  const edit_media = searchParams.get('edit_media')
  const edit_media_id = searchParams.get('edit_media_id')
  const edit_tumbnail = searchParams.get('edit_tumbnail')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [existingMedia, setExistingMedia] = useState<Media[]>(
     []
);
  const [error,setError] = useState<string>('');
  const [ProductData, setProductData] = useState<Product>();

  const open_popup_add_media = () => {
    router.push("?add_media=true");
  }
  const open_popup_edit_media = (media:Media) => {
    setTempMedia(media);
    router.push("?edit_media=true&edit_media_id="+media.id);
  }
  const open_popup_edit_tumbnail = () => {
    router.push("?edit_tumbnail=true");
  }

  const fullscree_general_profuct = () => {
    router.push("?fullscree_general_profuct=true");
  }

  useEffect(() => {
    axios.get(`${server_url}/api/product/${params}`)
    .then((res)=>{
        console.log(res.data);
        setProductData(res.data);
        setLoading(false);
        setExistingMedia(res.data.media)
    })
    .catch((Err)=>{
        console.log(Err.response.data);
        setError(Err.response.data.message);
    })
    .finally(()=>{
      setLoading(false);
    })
  },[]);
  
  useEffect(()=>{
    const foundMedia = existingMedia.find(x => x.id === edit_media_id);
    if (foundMedia) {
      setTempMedia(foundMedia);
    }
    console.log(foundMedia)
  },[edit_media_id,existingMedia])

  const [Temp_media,setTempMedia] = useState<Media>({
    id: String(params),
    mediaFor: MediaFor.Product,
    type: MediaType.Photo,
    link: '',
    referenceId: String(params)
  });

  const [Tumbnail,setTumbnail] = useState<string>(ProductData?.imageLink || "");
  const [TumbnailTemp,setTumbnailTemp] = useState<string>(Tumbnail);
  useEffect(()=>{
    setTumbnailTemp(Tumbnail);
  },[Tumbnail]);

  useEffect(()=>{
    setTumbnail(ProductData?.imageLink||"");
    console.log(ProductData);
    setExistingMedia(ProductData?.media || []);
  },[ProductData]);

  const Update_Tumbnail = () =>{
      setLoading(true);
      axios.put(server_url+"/api/Product/"+String(params),{imageLink:Tumbnail})
      .then((res)=>{
        setProductData(res.data);
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err.response);
        setError(err.response.data.message || "Error occured while updating Tumbnail")
      })
      .finally(()=>{
        setLoading(false);
        router.back();
      });
  }
  const Update_Media = (media:Media) => {
    setLoading(true);
      axios.put(server_url+"/api/media/product/"+String(params),media)
      .then((res)=>{
        console.log(res.data);
        setExistingMedia(existingMedia.map(m => m.id === media.id ? res.data : m));
        setProductData(prev => ({
          ...prev!,
          media: existingMedia.map(m => m.id === media.id ? res.data : m)
        }));
      })
      .catch((err)=>{
        console.log(err.response);
        setError(err.response.data.message ||"Error occured while updating Media")
      })
      .finally(()=>{
        setLoading(false);
        router.back();
      })
  };
  const Add_Media = (media: Media) => {
    setLoading(true);
    axios.post(server_url+"/api/media/product/" + String(params), media)
      .then((res) => {
        console.log(res.data);
        const newMedia = res.data;
        setProductData(newMedia);
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message || "Error occurred while adding Media");
      })
      .finally(() => {
        setLoading(false);
        router.back();
      });
  };
  const Delete_Media = (media: Media) => {
    setLoading(true);
    axios.delete(`${server_url}/api/media/${MediaFor.Product}/${media.id}`)
      .then(() => {
        // Remove the deleted media from existingMedia array
        const updatedMedia = existingMedia.filter(m => m.id !== media.id);
        setExistingMedia(updatedMedia);
        setProductData(prev => ({
          ...prev!,
          media: updatedMedia
        }));
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message || "Error occurred while deleting Media")
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (!ProductData && loading) {
    return (
      <div className=' h-screen flex items-center justify-center'>
        <ContainerLoader/>
      </div>
    )
  }

  const match_url = (url:string) => {
    return url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/);
  }
  return (
    <div className="min-h-[calc(100vh-60px)] bg-[#fafafa] transition-all">
        {error !== "" ?
    
            <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6'>
                <h1 className="text-2xl font-bold mb-6">Error</h1>
                <p className="text-red-600 text-lg">{error}</p>
            </div>
        :    
          <div className=" bg-red-500/0 w-full max-h-[calc(100vh-60px)] pb-16 overflow-y-auto flex flex-col gap-[1vw] ">
            {
              edit_tumbnail &&
              <AddMedia loading={loading}>
                 <div className=' flex flex-col gap-2'>
                <div className=' text-lg font-semibold text-[#1f3e2b]'>
                  Edit Product Tumbnail
                </div>
                <hr />
                {Tumbnail ? (
                  <div className="relative">
                    <Image
                      src={Tumbnail}
                      alt={"product thumbnail"}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <Image
                    src="https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"
                    alt="placeholder"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                )}
                <hr />

                <form className='flex w-full flex-col gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>Image Link</label>
                    <input 
                      type="text" 
                      className='w-full px-3 py-2 border rounded-lg'
                      placeholder="Enter media URL"
                      value={TumbnailTemp}
                      onChange={(e)=>{
                          setTumbnailTemp(e.target.value)
                          if(match_url(TumbnailTemp)){
                            setTumbnail(TumbnailTemp);
                          }
                        }                        
                    }
                    />
                  </div>
                <div className=' flex justify-end items-end'>  
                  <button 
                      type="button"
                      className='bg-[#e4f07b] font-semibold py-2
                      text-black px-4 rounded-lg hover:bg-[#b1ba60]'
                      onClick={() => {
                        Update_Tumbnail()
                      }}
                    >
                      Save Link
                    </button>
                </div>
                </form>
              </div>
              </AddMedia>
            }  
            {
              add_media && 
              <AddMedia loading={loading}>
              <div className=' flex flex-col min-w-[300px] gap-2'>
                <div className=' text-lg font-semibold text-[#1f3e2b]'>
                  Add Media
                </div>
                <hr />
                <form className='flex w-full flex-col gap-4'>
                  <div className=' w-full'>
                    <label className='block text-sm font-medium mb-1'>Media Type</label>
                    <select 
                      className='w-full px-3 py-2 border rounded-lg'
                      value={Temp_media.type === MediaType.Photo ? "0" : "1"}
                      onChange={(e) => {
                        setTempMedia({
                          ...Temp_media,
                          type: e.target.value === "0" ? MediaType.Photo : MediaType.Video
                        });
                      }}
                    >
                      <option value="0">Image</option>
                      <option value="1">Video</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className='block text-sm font-medium mb-1'>Media Link</label>
                    <input 
                      type="text" 
                      className='w-full px-3 py-2 border rounded-lg'
                      placeholder="Enter media URL"
                      value={Temp_media.link}
                      onChange={(e) => {
                        setTempMedia({
                          ...Temp_media,
                          link: e.target.value.trim()
                        });
                      }}
                    />
                  </div>
                <div className=' flex justify-end items-end'>  
                   {match_url(Temp_media.link) &&
                  (Temp_media.type === MediaType.Video ||  (Temp_media.link.startsWith("https://") || Temp_media.link.startsWith("http://")))?
                  <button 
                      type="button"
                      className='bg-[#e4f07b] font-semibold py-2
                      text-black px-4 rounded-lg hover:bg-[#b1ba60]'
                      onClick={() => {
                        Add_Media(Temp_media);
                      }
                    }
                    >
                    Add {Temp_media.type === MediaType.Photo ? "Photo" : "Video"}
                    </button>
                    :
                    <button 
                    type="button"
                    className='bg-[#e4f07b] opacity-45 hover:cursor-not-allowed font-semibold py-2
                    text-black px-4 rounded-lg' >
                    Add {Temp_media.type === MediaType.Photo ? "Photo" : "Video"}
                  </button>

                    }
                </div>
                </form>
              </div>
              </AddMedia>
            }
            {
              edit_media &&
              <AddMedia loading={loading}>
                <div className=' flex min-w-[300px] flex-col gap-2'>
                <div className=' text-lg font-semibold text-[#1f3e2b]'>
                  Edit Media
                </div>
                <hr />
                <form className='flex w-full flex-col gap-4'>
                  <div>
                    <label className='block text-sm font-medium mb-1'>{Temp_media.type === MediaType.Photo ? "Photo" : "Video"} Link</label>
                    <input 
                      type="text" 
                      className='w-full px-3 py-2 border rounded-lg'
                      placeholder="Enter media URL"
                      value={Temp_media.link}
                      onChange={(e) => {
                        setTempMedia({
                          ...Temp_media,
                          link: e.target.value.trim()
                        });
                      }}
                    />
                  </div>
                  <div className=' flex justify-end items-end'>  
                {Temp_media.link !== ProductData?.media.find(x=>x.id == Temp_media.id)?.link && match_url(Temp_media.link) ?
                  <button 
                      type="button"
                      className='bg-[#e4f07b] font-semibold py-2
                      text-black px-4 rounded-lg hover:bg-[#b1ba60]'
                      onClick={() => {
                        Update_Media(Temp_media);
                      }
                    }
                    >
                      Update {Temp_media.type === MediaType.Photo ? "Photo" : "Video"}
                    </button>
                    :
                    <button 
                    type="button"
                    className='bg-[#e4f07b] opacity-45 hover:cursor-not-allowed font-semibold py-2
                    text-black px-4 rounded-lg' >
                    Update {Temp_media.type === MediaType.Photo ? "Photo" : "Video"}
                  </button>

                    }
                </div>
                </form>
              </div>
              </AddMedia>
            }
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
              <div className=' flex max-md:flex-col h-fit px-7 gap-[1vw] max-sm:gap-[1vh] max-sm:mt-5'>
                <div className=' w-[35%] flex flex-col gap-[2vh] max-md:w-full '>
                    <div className='bg-white h-fit shadow-sm rounded-md'>
                        <Collapse title='Product Image' defaultOpen>
                        <div className="p-4 rounded-lg shadow-sm">
                            <div className=' p-3'>
                              <div className=' flex flex-col gap-2'>
                                  <label htmlFor="tagger" className=' text-gray-700'>Tag</label>
                                  <input type="text" id='tagger' placeholder='Type and enter'
                                  className=' px-4 shadow-sm outline-none  
                                        focus:border-[1.3px] transition-all focus:border-[#d5d4d4]
                                      tracking-wide w-full border p-2 rounded-md'/>
                              </div>
                            </div>

                            <div className=' p-3 '>
                              <div className=' flex flex-col gap-2'>
                                  <label htmlFor="tagger" className=' text-gray-700'>Product Tumbnail Image</label>
                                  <div className='group w-full relative overflow-hidden h-[300px] bg-slate-100 rounded-lg'>
                                    <Image
                                      src={Tumbnail ||"https://jaimaaroadlines.websites.co.in/dummytemplate/img/product-placeholder.png"}
                                      alt={"name"}
                                      width={400}
                                      height={300}
                                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className=' z-[60] absolute top-5 font-semibold hover:cursor-pointer right-3 px-3 py-1 
                                    bg-[#e4f07b] rounded-md  shadow-md'>
                                        Tumbnail
                                    </div>
                                    <div className='opacity-0 delay-300 group-hover:opacity-100 transition-all absolute h-full w-full
                                    top-0 bottom-0 left-0 row-auto bg-black/30 z-50 flex items-center justify-center gap-4'>
                                        <div onClick={open_popup_edit_tumbnail} 
                                        className='px-3 p-2 bg-white rounded-md text-green-900 
                                        cursor-pointer hover:bg-green-50'>Replace</div>
                                    </div>
                                  </div>
                              </div>
                            </div>
                          </div>
                        </Collapse>
                    </div>
                    <div className=' py-1 h-fit bg-white shadow-sm rounded-md'>
                        <Collapse title='Description Media' >
                        <div className="p-4 space-y-6 py-10 rounded-lg shadow-sm">
                           <div onClick={()=>{open_popup_add_media();}} 
                            className=' bg-[#e1f166] flex items-center justify-center shadow-sm p-2 rounded-md 
                            text-[#294531] border w-fit hover:cursor-pointer hover:shadow-lg transition-all'>
                              <UploadIcon className='w-8 scale-50 h-8'/>
                              <p className=' font-semibold'>Add Another Video/Image</p>
                            </div>
                          <div className=' p-3'>
                            <div className=' flex flex-col gap-2'>
                                <label htmlFor="tagger" className=' text-gray-700'>Product Images</label>
                                  {
                                    existingMedia.map((media,idx)=>
                                    <div key={idx} className='group w-full relative overflow-hidden h-[300px] bg-slate-100 rounded-lg'>
                                    {
                                      media.type === MediaType.Photo ?
                                        <Image
                                          src={media.link}
                                          alt={media.mediaFor}
                                          width={400}
                                          height={300}
                                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                        />
                                        :
                                        (media.link.match(/youtube.com/) || media.link.match(/youtu.be/)) ?
                                        <div className=' w-full flex items-center justify-center'>
                                            <div dangerouslySetInnerHTML={{__html: media.link}} />
                                        </div> 
                                        :
                                        <div className=' w-full flex items-center justify-center'>
                                          <VideoComponent media={media}/>
                                        </div> 
                                    }
                                    <div className=' hidden group-hover:flex transition-all absolute right-4
                                     top-3  row-auto bg- z-50  items-center justify-center gap-4'>
                                      <div onClick={()=>{
                                        open_popup_edit_media(media);
                                      }} className='px-3 p-2 bg-white rounded-md text-green-900
                                       cursor-pointer hover:bg-green-50'>Replace</div>
                                      <div onClick={()=>{
                                        // setExistingMedia(existingMedia.filter((m) => m.id !== media.id));
                                        Delete_Media(media);
                                      }} className='px-3 p-2 bg-white rounded-md text-red-900
                                       cursor-pointer hover:bg-red-50'>Delete</div>
                                    </div>
                                    </div>
                                    )
                                  }
                            </div>
                          </div>
                        </div>

                        </Collapse>
                  </div>
                </div>
                <div className='max-md:w-full flex-1 flex flex-col gap-4 h-fit '>
                  <div className=' bg-white shadow-sm rounded-md relative'>
                    <Collapse  title='General Information' defaultOpen>
                              <div onClick={fullscree_general_profuct}
                                  className=' p-2 absolute top-2 right-16 hover:bg-black/20 transition-all active:scale-90 rounded-full '>
                                  <Maximize/>
                              </div>
                              <GeneralProductInfo 
                                ProductData={{
                                  id : String(params),
                                  name: ProductData?.name || "",
                                  description : ProductData?.description || "",
                                  actualPrice: ProductData?.actualPrice || 0,
                                  discount: ProductData?.discount || 0,
                                  dateCreated : ProductData?.dateCreated || '',
                                  setError : setError,
                                  setData : (name:string,actualPrice:number,discount_:number,description:string) => {
                                    setProductData((prev) => ({
                                      ...prev!,
                                      name,
                                      actualPrice,
                                      discount:discount_,
                                      description
                                    }
                                  ));
                                  // console.log(name === ProductData?.name,
                                  //   actualPrice===ProductData?.actualPrice,
                                  //   discount_ === ProductData?.discount,
                                  //   description === ProductData?.description);
                                  // console.log(discount_,ProductData?.discount);
                                  },
                                }}
                                StockData={{
                                  id : String(params),
                                  stock: ProductData?.stock || 0,
                                  isAvailable: ProductData?.isAvailable || false,
                                  lowStockThreshold: ProductData?.lowStockAlertThreshold || 0,
                                  setError : setError,
                                  setData : (stock:number,isAvailable:boolean,lowStockThreshold:number) => {
                                    setProductData((prev)=>({
                                      ...prev!,
                                      stock,
                                      isAvailable,
                                      lowStockAlertThreshold:lowStockThreshold
                                    })
                                  );
                                    console.log(lowStockThreshold,ProductData?.lowStockAlertThreshold);
                                  },
                                }} 
                              />
                    </Collapse>
                  </div>
                  <div className=' bg-white  rounded-md shadow-sm relative'>
                    <Collapse title='Manage Product Features'>
                                <FeatureManagement 
                                  pid={String(params)}
                                  features={ProductData?.features || []}
                                  setFeaturesData={(features:Feature[]) => {
                                    setProductData((prev) => ({
                                      ...prev!,
                                      features
                                    }));
                                  }}
                                />
                    </Collapse>
                  </div>
                  <div className=' bg-white  rounded-md shadow-sm relative'>
                    <Collapse title='Manage Product Categories'>
                        <CategoryManagement
                          categories={ProductData?.categories || []}
                          pid={String(params)}
                          setCategoriesData={(categories) => {}}
                        />
                    </Collapse>
                  </div>
                </div>
              </div>
          </div> 
       
    }
     
    </div>
  )
}

export default EditProductPage