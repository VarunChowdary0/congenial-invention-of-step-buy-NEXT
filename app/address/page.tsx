"use client";

import { server_url } from '@/components/Constant';
import ContainerLoader from '@/components/mini/ContainerLoader';
import PopUp from '@/components/popups/PopUp';
import { Address } from '@/types/personal';
import axios from 'axios';
import { MapPin, MapPinHouseIcon, PencilIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface PoperProps{
  heading : string;
  callback : ()=> void;
  buttonLable : string;
}


const page = () => {
  const parms = useSearchParams();
  const router = useRouter();
  const {data} = useSession();
  const [load,setLoading] = useState<boolean>(false);
  const [message,setMsg] = useState<string>("");
  const [Temp,setTemp] = useState<Address>({
    id: "",
    userId: data?.user?.id ?? '',
    houseNo: "",
    buildingName: "",
    plotNo: "",
    roadNumber: "",
    colonyName: "",
    areaName: "",
    cityName: "",
    districtName: "",
    state: "",
    country: "India",
    pin: "",
    alternatePhone: "",
    nameOfReciver : ""
  });

  const showAdder = () => {
    router.push('?add=true');
  }
  const showEditor = (idx: number) => {
    if (!Addressess || Addressess.length <= idx) return;
    let ad = { ...Addressess[idx], userId: data?.user?.id || '' };
    setTemp(ad);
    router.push(`?edit=true&id=${idx}`);
  };
  

  const [Addressess, setAddressess] = useState<Address[]>([]);

  useEffect(() => {
    if (!data?.user?.id) return;
    axios.get(`${server_url}/api/address/${data.user.id}`)
      .then(res => setAddressess(res.data))
      .catch(console.log);
  }, [data?.user?.id]);
  

  useEffect(() => {
    const id = parms.get('id');
    if (parms.get('edit') && id && Addressess) {
      let idx = parseInt(id);
      if (idx < Addressess.length) {
        let ad = { ...Addressess[idx], userId: data?.user?.id || '' };
        setTemp(ad);
      }
    }
  }, [Addressess, parms]);
  


  const checker = () => {
    const requiredFields = [
      Temp.nameOfReciver, Temp.alternatePhone, Temp.houseNo, Temp.colonyName,
      Temp.areaName, Temp.cityName, Temp.districtName, Temp.state, Temp.pin
    ];
    if (requiredFields.some(field => field.trim() === "")) {
      setMsg("Please fill the fields marked with *");
      return false;
    }
    return true;
  };
  

  const AddNewAddress  = () => {
    if(checker()){
        setLoading(true);
        axios.post(server_url+"/api/address",Temp)
        .then((res)=>{
          console.log(res);
          setAddressess((addr)=>[...(addr || []),res.data]);
        })
        .catch((err)=>{
          console.log(err);
        })
        .finally(()=>{
          router.back();
          setTemp({
            id: "",
            userId: data?.user?.id ?? '',
            houseNo: "",
            buildingName: "",
            plotNo: "",
            roadNumber: "",
            colonyName: "",
            areaName: "",
            cityName: "",
            districtName: "",
            state: "",
            country: "India",
            pin: "",
            alternatePhone: "",
            nameOfReciver : ""
          })
          setLoading(false);
        })
     }
  }

  const UpdateAddress = () => {
    if(checker()){
      setLoading(true);
      axios.put(server_url+"/api/address/"+Temp.id,Temp)
      .then((res)=>{
        setAddressess((addr)=>addr?.map((ad)=>ad.id === Temp.id?Temp:ad));
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        setTemp({
          id: "",
          userId: data?.user?.id ?? '',
          houseNo: "",
          buildingName: "",
          plotNo: "",
          roadNumber: "",
          colonyName: "",
          areaName: "",
          cityName: "",
          districtName: "",
          state: "",
          country: "India",
          pin: "",
          alternatePhone: "",
          nameOfReciver : ""
        })
        router.back();
        setLoading(false);  
      })

      setTemp({
        id: "",
        userId: data?.user?.id ?? '',
        houseNo: "",
        buildingName: "",
        plotNo: "",
        roadNumber: "",
        colonyName: "",
        areaName: "",
        cityName: "",
        districtName: "",
        state: "",
        country: "India",
        pin: "",
        alternatePhone: "",
        nameOfReciver : ""
      });
    }
  }

  const deleteAddr = (id:string) => {
    setLoading(true);
    axios.delete(server_url+"/api/address/"+id)
    .then((res)=>{
      setAddressess((addr)=>addr?.filter((ad)=>ad.id !== id));
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      setLoading(false);
    })
  } 



  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {
          parms.get('add') &&
          <PopUp loading={load}>
             {/* <Poper 
                heading='New Address' 
                callback={AddNewAddress}
                buttonLable='Add address' /> */}
                
      <div className=' w-[50vw] max-sm:w-[90vw] py-2  min-h-[700px]'>
      <div className=' w-full flex items-center gap-2 py-3 px-5 shadow'>
        <MapPinHouseIcon/>
        <p className=' font-semibold text-xl'>{"New Address"}</p>
      </div>
      <div className=' flex py-6 px-10 max-sm:px-4 flex-col gap-4'>
        <div className=' w-full flex flex-wrap gap-3'>
            <div className=' flex-1 w-full flex-col'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="reciver">Reciver Name
                <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text"  id='reciver' className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `} 
                    placeholder='Jon Deo'
                    onChange={(e)=>setTemp((temp)=>({...temp,nameOfReciver:e.target.value}))}
                    value={Temp.nameOfReciver} />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="altPh">Phone Number
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="tel" id="altPh"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,alternatePhone:e.target.value}))} 
                value={Temp.alternatePhone}   
                placeholder='9229302429' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="Hno">House Number
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="Hno"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,houseNo:e.target.value}))}
                value={Temp.houseNo} 
                placeholder='32-5/7' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="pltNo">Plot Number</label>
              <input type="text" id="pltNo"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,plotNo:e.target.value}))}
                value={Temp.plotNo}  
                placeholder='B-22' />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="buldNme">Building Name</label>
              <input type="text" id="buldNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,buildingName:e.target.value}))}
              value={Temp.buildingName}      placeholder='Hibp Towers' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="coloN">Colony Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="coloN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,colonyName:e.target.value}))}      
          value={Temp.colonyName}  
                 placeholder='Gandi Nagar' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="arN">Area Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="arN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,areaName:e.target.value}))}
                value={Temp.areaName}    placeholder='Miyapur' />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="ctyNme">City Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="ctyNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,cityName:e.target.value}))}
                value={Temp.cityName}    placeholder='Hyderbad' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="dctN">District Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="dctN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,districtName:e.target.value}))}
                value={Temp.districtName}     placeholder='Hyderbad' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="stNm">State
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="stNm"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,state:e.target.value}))}
                value={Temp.state}     placeholder='Telangana' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="pin">PIN
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="number" id="pin"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          value={Temp.pin}
          onChange={(e)=>setTemp((temp)=>({...temp,pin:e.target.value}))}
                    placeholder='500001' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="con">Country</label>
              <input type="text" id="con" disabled  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 font-bold tracking-wider hover:cursor-not-allowed`} value={Temp.country} />
            </div>
        </div>
        <div className=' relative w-full flex justify-end '>
          <p className=' text-xs top-4 text-red-600 left-0 absolute'>{message}</p>
          <div onClick={AddNewAddress} className=' bg-[#e4f07b] w-fit rounded-md 
           active:scale-90 hover:scale-105 transition-all hover:cursor-pointer select-none
            px-4 py-2 text-lg max-sm:text-md font-semibold'>{"Add address"}</div>
        </div>
      </div>
    </div> 
          </PopUp>
        }
        {
          parms.get('edit') &&
          <PopUp loading={load}>
                    <div className=' w-[50vw] max-sm:w-[90vw] py-2  min-h-[700px]'>
      <div className=' w-full flex items-center gap-2 py-3 px-5 shadow'>
        <MapPinHouseIcon/>
        <p className=' font-semibold text-xl'>{"Edit Address"}</p>
      </div>
      <div className=' flex py-6 px-10 max-sm:px-4 flex-col gap-4'>
        <div className=' w-full flex flex-wrap gap-3'>
            <div className=' flex-1 w-full flex-col'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="reciver">Reciver Name
                <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text"  id='reciver' className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `} 
                    placeholder='Jon Deo'
                    onChange={(e)=>setTemp((temp)=>({...temp,nameOfReciver:e.target.value}))}
                    value={Temp.nameOfReciver} />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="altPh">Phone Number
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="tel" id="altPh"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,alternatePhone:e.target.value}))} 
                value={Temp.alternatePhone}   
                placeholder='9229302429' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="Hno">House Number
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="Hno"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,houseNo:e.target.value}))}
                value={Temp.houseNo} 
                placeholder='32-5/7' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="pltNo">Plot Number</label>
              <input type="text" id="pltNo"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,plotNo:e.target.value}))}
                value={Temp.plotNo}  
                placeholder='B-22' />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="buldNme">Building Name</label>
              <input type="text" id="buldNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
                onChange={(e)=>setTemp((temp)=>({...temp,buildingName:e.target.value}))}
              value={Temp.buildingName}      placeholder='Hibp Towers' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="coloN">Colony Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="coloN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,colonyName:e.target.value}))}      
          value={Temp.colonyName}  
                 placeholder='Gandi Nagar' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="arN">Area Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="arN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,areaName:e.target.value}))}
                value={Temp.areaName}    placeholder='Miyapur' />
            </div>
        </div>
        <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="ctyNme">City Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="ctyNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,cityName:e.target.value}))}
                value={Temp.cityName}    placeholder='Hyderbad' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="dctN">District Name
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="dctN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,districtName:e.target.value}))}
                value={Temp.districtName}     placeholder='Hyderbad' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="stNm">State
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="text" id="stNm"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          onChange={(e)=>setTemp((temp)=>({...temp,state:e.target.value}))}
                value={Temp.state}     placeholder='Telangana' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="pin">PIN
              <span className=' text-red-600 ml-1'>*</span>
              </label>
              <input type="number" id="pin"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 `}
          value={Temp.pin}
          onChange={(e)=>setTemp((temp)=>({...temp,pin:e.target.value}))}
                    placeholder='500001' />
            </div>
            <div className=' flex flex-col max-sm:w-full gap-2'>
              <label className=' text-sm font-semibold text-[#093212]' htmlFor="con">Country</label>
              <input type="text" id="con" disabled  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
          focus:border-blue-500 font-bold tracking-wider hover:cursor-not-allowed`} value={Temp.country} />
            </div>
        </div>
        <div className=' relative w-full flex justify-end '>
          <p className=' text-xs top-4 text-red-600 left-0 absolute'>{message}</p>
          <div onClick={UpdateAddress} className=' bg-[#e4f07b] w-fit rounded-md 
           active:scale-90 hover:scale-105 transition-all hover:cursor-pointer select-none
            px-4 py-2 text-lg max-sm:text-md font-semibold'>{"Save Changes"}</div>
        </div>
      </div>
    </div> 
          </PopUp>
        }
        <h1  className=' text-[#092617] text-2xl font-bold mb-8'>Shipping Addressess</h1>
        <div className=' flex flex-wrap gap-10 items-center justify-center'>
          <div onClick={showAdder} className=' group p-4 flex bg-white border-2 w-[350px] border-dotted 
             items-center justify-center flex-col gap-6
          border-[#c3c3c3] rounded-md h-[300px] '> 
              <PlusCircleIcon size={50} className=' group-hover:text-[#262626] transition-all
               duration-500 group-hover:scale-150 group-active:scale-90 text-[#9e9e9e]'/>    
               <p className=' text-xl font-semibold'>Add New Address</p>
          </div>
          {
            Addressess ?
            Addressess.map((addr,idx)=>
            <div key={idx+addr.id} className='relative w-[350px]  bg-white border border-[#c3c3c3] rounded-md h-[300px]'>
              { idx === 0 ? 
              <div className=' w-full px-5 py-2 border-b border-[#c3c3c3]'>
                Default Address
              </div>
              :
              <div className=' h-5'></div>   
            }
              <div className=' px-4 py-2 text-sm flex flex-col '> 
                  <p className=' mb-1 font-semibold'>{addr.nameOfReciver}</p>
                  <p className=''>{addr.buildingName.trim()!==""?addr.buildingName+" ,":"" } HNO: {addr.houseNo}</p>
                  <p className=''>{addr.colonyName} </p>
                  <p className=''>{addr.areaName}{addr.plotNo.trim()!==""?`, plot no: ${addr.plotNo}`:''} </p>
                  <p className=''>{addr.districtName} </p>
                  <p className=''>{addr.cityName} ,{addr.state} ,{addr.pin}</p>
                  <p className=' flex items-center gap-1 my-2'>
                    <MapPin size={14} className=' text-sky-400'/>
                    {addr.country} </p>
                  <p>Phone Number: {addr.alternatePhone}</p>

                  <div className=' absolute gap-3 px-5 flex items-center bottom-0 right-0 left-0 w-full h-10 bg-slate-0'>
                    <div onClick={()=>{
                      showEditor(idx);
                    }} className=' w-fit px-3 rounded-full border-[#b4b4b4] text-xs py-1 active:scale-50 hover:scale-110
                     hover:text-black hover:bg-white hover:cursor-pointer transition-all duration-500
                      border flex items-center justify-center gap-1 bg-black text-white'>
                      <PencilIcon size={10}/>
                      Edit
                    </div>
                    <div onClick={()=>deleteAddr(addr.id)} className=' w-fit px-3 rounded-full border-[#b4b4b4] text-xs py-1 active:scale-50 hover:scale-110
                     hover:text-white hover:bg-red-600 hover:cursor-pointer transition-all duration-500
                      border flex items-center justify-center gap-1 bg-red-text-red-600 text-red-500'>
                      <Trash2Icon size={10}/>
                      Delete
                    </div>
                  </div>
              </div>
            </div>    
            )
             :
             <div className=' z-50'>
              <ContainerLoader/>
             </div>
          }
        </div>
      </div>
    </div>
  )
}

export default page











// const Poper = (props:PoperProps) => {
//   return (

//     <div className=' w-[50vw] max-sm:w-[90vw] py-2  min-h-[700px]'>
//     <div className=' w-full flex items-center gap-2 py-3 px-5 shadow'>
//       <MapPinHouseIcon/>
//       <p className=' font-semibold text-xl'>{props.heading}</p>
//     </div>
//     <div className=' flex py-6 px-10 max-sm:px-4 flex-col gap-4'>
//       <div className=' w-full flex flex-wrap gap-3'>
//           <div className=' flex-1 w-full flex-col'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="reciver">Reciver Name
//               <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text"  id='reciver' className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `} 
//                   placeholder='Jon Deo'
//                   onChange={(e)=>setTemp((temp)=>({...temp,nameOfReciver:e.target.value}))}
//                   value={Temp.nameOfReciver} />
//           </div>
//       </div>
//       <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="altPh">Phone Number
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="tel" id="altPh"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//               onChange={(e)=>setTemp((temp)=>({...temp,alternatePhone:e.target.value}))} 
//               value={Temp.alternatePhone}   
//               placeholder='9229302429' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="Hno">House Number
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="Hno"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//               onChange={(e)=>setTemp((temp)=>({...temp,houseNo:e.target.value}))}
//               value={Temp.houseNo} 
//               placeholder='32-5/7' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="pltNo">Plot Number</label>
//             <input type="text" id="pltNo"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//               onChange={(e)=>setTemp((temp)=>({...temp,plotNo:e.target.value}))}
//               value={Temp.plotNo}  
//               placeholder='B-22' />
//           </div>
//       </div>
//       <div className=' grid grid-cols-1 md:grid-cols-3 gap-4'>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="buldNme">Building Name</label>
//             <input type="text" id="buldNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//               onChange={(e)=>setTemp((temp)=>({...temp,buildingName:e.target.value}))}
//             value={Temp.buildingName}      placeholder='Hibp Towers' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="coloN">Colony Name
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="coloN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         onChange={(e)=>setTemp((temp)=>({...temp,colonyName:e.target.value}))}      
//         value={Temp.colonyName}  
//                placeholder='Gandi Nagar' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="arN">Area Name
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="arN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         onChange={(e)=>setTemp((temp)=>({...temp,areaName:e.target.value}))}
//               value={Temp.areaName}    placeholder='Miyapur' />
//           </div>
//       </div>
//       <div className=' grid grid-cols-1 md:grid-cols-2 gap-4'>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="ctyNme">City Name
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="ctyNme"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         onChange={(e)=>setTemp((temp)=>({...temp,cityName:e.target.value}))}
//               value={Temp.cityName}    placeholder='Hyderbad' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="dctN">District Name
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="dctN"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         onChange={(e)=>setTemp((temp)=>({...temp,districtName:e.target.value}))}
//               value={Temp.districtName}     placeholder='Hyderbad' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="stNm">State
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="text" id="stNm"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         onChange={(e)=>setTemp((temp)=>({...temp,state:e.target.value}))}
//               value={Temp.state}     placeholder='Telangana' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="pin">PIN
//             <span className=' text-red-600 ml-1'>*</span>
//             </label>
//             <input type="number" id="pin"  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 `}
//         value={Temp.pin}
//         onChange={(e)=>setTemp((temp)=>({...temp,pin:e.target.value}))}
//                   placeholder='500001' />
//           </div>
//           <div className=' flex flex-col max-sm:w-full gap-2'>
//             <label className=' text-sm font-semibold text-[#093212]' htmlFor="con">Country</label>
//             <input type="text" id="con" disabled  className={` w-full px-4 py-2 border rounded-md outline-none transition-all
//         focus:border-blue-500 font-bold tracking-wider hover:cursor-not-allowed`} value={Temp.country} />
//           </div>
//       </div>
//       <div className=' relative w-full flex justify-end '>
//         <p className=' text-xs top-4 text-red-600 left-0 absolute'>{message}</p>
//         <div onClick={props.callback} className=' bg-[#e4f07b] w-fit rounded-md 
//          active:scale-90 hover:scale-105 transition-all hover:cursor-pointer select-none
//           px-4 py-2 text-lg max-sm:text-md font-semibold'>{props.buttonLable}</div>
//       </div>
//     </div>
//   </div>  
//   );
// }