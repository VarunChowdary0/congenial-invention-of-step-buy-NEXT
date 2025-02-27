import React, { useEffect, useState } from 'react'
import ExtreLabledInputNumber from '../../mini/ExtreLabledInputNumber';
import axios from 'axios';
import { Minimize, Percent } from 'lucide-react';
import StockManagement from './StockManagement';
import { FaRupeeSign } from 'react-icons/fa';
import Collapse from '../../popups/Collpse';
import PopUp from '../../popups/PopUp';
import { useRouter, useSearchParams } from 'next/navigation';
import ContainerLoader from '../../mini/ContainerLoader';
import { formatPrice, server_url } from '../../Constant';

interface ProductData {
    id : string;
    name: string;
    actualPrice: number;
    discount: number;
    description: string;
    dateCreated : string;
    setError : React.Dispatch<React.SetStateAction<string>>;
    setData : (name:string,actualPrice:number,discount_:number,description:string)=>void;
}

interface StockData{
    id: string;
    stock: number;
    lowStockThreshold: number;
    isAvailable: boolean;
    setData: (stock: number, isAvailable: boolean, lowStockThreshold: number) => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
}

interface GeneralProductInfoProps {
    ProductData: ProductData;
    StockData : StockData
}

const GeneralProductInfo: React.FC<GeneralProductInfoProps> = ({ ProductData,StockData }) => {

    const searchParms = useSearchParams();
    const router = useRouter();
    const [productname, setProductname] = useState<string>(ProductData?.name || '');
    const [description, setDescription] = useState<string>(ProductData?.description || '');
    const [actualPrice, setActualPrice] = useState<number>(ProductData?.actualPrice || 0);
    const [discount_, setDiscount] = useState<number>(ProductData?.discount || 0);
    const [errors, setErrors] = useState<Partial<Record<keyof ProductData, string>>>({});

    console.log(setErrors);
    // --

    const [stock,setStock] = useState<number>(StockData.stock || 0);
    const [isAvailable,setIsAvailable] = useState<boolean>(StockData.isAvailable || false);
    const [lowStockThreshold,setLowStockThreshold] = useState<number>(StockData.lowStockThreshold || 0); 
    const [loading, setLoading] = useState(false);

    const [fullScreen,setFull] = useState(searchParms.get('fullscree_general_profuct') === 'true');



    useEffect(() => {
        setDiscount(prev =>Math.min(prev, 99));
    }, [discount_]);

    useEffect(()=>{
        setFull(searchParms.get('fullscree_general_profuct') === 'true');
    },[searchParms.get('fullscree_general_profuct')]);


    const calculatedPrice = actualPrice - (actualPrice * (discount_ / 100));
    
    const Save_data = () =>{
        setLoading(true);
        console.log(JSON.stringify(ProductData))
        const payload = {
            "name": productname,
            "actualPrice": actualPrice,
            "discount": discount_,
            "description": description,
            "stock": stock,
            "lowStockAlertThreshold":  lowStockThreshold,
            "isAvailable": isAvailable,
            };

            // console.log("plo: :",JSON.stringify(payload));
        axios.put(server_url+"/api/Product/"+String(ProductData.id),payload)
        .then((res)=>{
        //   console.log("erews: ",res.data);
          ProductData.setData(res.data.name,res.data.actualPrice,res.data.discount,res.data.description);
          setDiscount(res.data.discount);
          setActualPrice(res.data.actualPrice);
          setProductname(res.data.name);
          setDescription(res.data.description);
          setStock(res.data.stock);
          setIsAvailable(res.data.isAvailable);
        setLowStockThreshold(res.data.lowStockAlertThreshold);
        StockData.setData(res.data.stock,res.data.isAvailable,res.data.lowStockAlertThreshold);

        })
        .catch((err)=>{
          console.log(err.response);
          ProductData.setError(err.response.data.message || "Error occured while updating Product")
        })
        .finally(()=>{
            setLoading(false);

            // console.log(
            //     productname === ProductData?.name,
            //     actualPrice===ProductData?.actualPrice,
            //     discount_ === ProductData?.discount,
            //     description === ProductData?.description
            // );

            console.log(
                stock === StockData.stock,
                isAvailable === StockData.isAvailable,
                lowStockThreshold === StockData.lowStockThreshold);
            console.log(lowStockThreshold,StockData.lowStockThreshold);
        });
    }
    
    if(loading){
        return <ContainerLoader/>
    }

    const content =  (
        <div className=" space-y-6 p-10 rounded-lg shadow-sm">
        {/* Product Name */}
        <div className="space-y-2">
            <label htmlFor="productname" className="block text-sm font-medium text-gray-700">
                Product Name
            </label>
            <input
                type="text"
                id="productname"
                value={productname}
                onChange={(e) => setProductname(e.target.value)}
                placeholder="Enter product name"
                className={`w-full px-4 py-2 border rounded-md outline-none transition-all
                    ${errors.name ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
            )}
        </div>

        {/* Pricing Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
                <label htmlFor="actualPrice" className="block text-sm font-medium text-gray-700">
                    Actual Price
                </label>
                <ExtreLabledInputNumber
                    id="actualPrice"
                    value={actualPrice}
                    setter={setActualPrice}
                    placeholder="Enter price"
                    lable={
                         <div className=' w-10 bg-black/0 h-10 flex items-center justify-center'>
                            <FaRupeeSign/>
                        </div>
                    }
                />
                {errors.actualPrice && (
                    <p className="text-sm text-red-500">{errors.actualPrice}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                    Discount
                    <span className="ml-2 text-gray-400 text-xs">Optional</span>
                </label>
                <ExtreLabledInputNumber
                    id="discount"
                    value={discount_}
                    setter={setDiscount}
                    placeholder="0"
                    lable={
                        <div className=' w-10 bg-black/0 h-10 flex items-center justify-center'>
                           <Percent className=' w-5'/>
                       </div>
                   }
                />
                {errors.discount && (
                    <p className="text-sm text-red-500">{errors.discount}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
                    Final Price
                </label>
                <ExtreLabledInputNumber
                    id="discountPrice"
                    value={calculatedPrice}
                    diasbled={true}
                    placeholder="Calculated price"
                    lable={
                        <div className=' w-10 bg-black/0 h-10 flex items-center justify-center'>
                           <FaRupeeSign/>
                       </div>}
                />
            </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Product Description
            </label>
            <textarea
                autoCorrect='on'
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                rows={4}
                className={`w-full px-4 py-2 border rounded-md outline-none transition-all resize-none
                    ${errors.description ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
            )}
        </div>
        
        <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Date Created
            </label>
            <div
                className={`w-fit  px-4 py-2 border rounded-md outline-none transition-all resize-none
                    ${errors.description ? 'border-red-500' : 'focus:border-blue-500'}`}
            >
                {new Date(ProductData.dateCreated).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </div>
            {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
            )}
        </div>

        {/* Price Summary */}
        {discount_ > 0 && (
            <div className="mt-4 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-green-700">
                    You are offering a {discount_}% discount. Customers save 
                    {" "+ formatPrice((actualPrice - calculatedPrice))}
                </p>
            </div>
        )}
        <div className=' border-[1.4px] rounded-md shadow-sm border-[#f4f1f1]'>
            <Collapse title='Stock Management'>
                    <StockManagement StockData={{
                        stock: stock,
                        setStock : setStock,
                        lowStockThreshold: lowStockThreshold,
                        setLowStockThreshold : setLowStockThreshold,
                        isAvailable: isAvailable,
                        setIsAvailable : setIsAvailable,
                    }} />
                </Collapse>
        </div>
        {
        (   ProductData.name !== productname ||
            ProductData.actualPrice !== actualPrice ||
            ProductData.discount !== discount_ ||
            ProductData.description !== description 
            ||
            StockData.stock !== stock ||
            StockData.lowStockThreshold !== lowStockThreshold ||
            StockData.isAvailable !== isAvailable
        ) 
            &&

            <div className=' w-full h-14 flex items-center px-10 justify-between'>
                <p className=' text-sm text-orange-500'>
                    Save Changes.
                </p>
                <button 
                onClick={Save_data}
                className=' px-6 py-2 hover:bg-white border-[1.4px] active:scale-90 transition-all
                shadow hover:shadow-lg duration-700
                bg-[#e4f07b] text-black rounded-md'>Save</button>
            </div>
        }
    </div>
        );

    return (
        <>
            {
                fullScreen ?
                <PopUp loading={loading}>
                <div className=' p-5 rounded-lg flex justify-between  pr-10 items-center
                 text-lg font-semibold sticky top-0 w-full 
                bg-white z-[1000] pb-4 shadow'>
                    <p>General Product Info</p>
                    <div onClick={()=>{
                        router.back();
                    }} className=' p-2 hover:bg-black/20 transition-all active:scale-90 rounded-full '>
                        <Minimize/>
                    </div>
                </div>
                {content}
                </PopUp>
                :
                content
            }
        </>
       
    );
};

export default GeneralProductInfo;