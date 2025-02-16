import { Feature } from '@/types/item';
import axios from 'axios';
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import ContainerLoader from './ContainerLoader';
import { server_url } from '../Constant';

interface curr{
    id: string;
    index:number;
    attribute: string
    value: string
    updateFeature : (index: number, field: string, value: string) => void;
    removeFeature : (indexToRemove: number) => void;
}

const EditFeature:React.FC<curr> = (feature) => {
    const [attr,setAttr] = useState<string>(feature.attribute);
    const [value,setvalue] = useState<string>(feature.value);
    const [loading, setLoading] = useState(false);

    // useEffect(()=>{
    //     console.log(attr,feature.attribute);
    //     console.log(value,feature.value);
    // },[attr,value])
    const Save_changes = () => {
        setLoading(true);
        axios.put(server_url+"/api/feature/"+feature.id,{
            "attribute" : attr,
            "value":value
        })
        .then((res)=>{
            const newFeature: Feature = res.data;
            console.log(newFeature)
            setAttr(newFeature.attribute);
            setvalue(newFeature.value);
            console.log(newFeature.attribute,newFeature.value);
            feature.updateFeature(feature.index, newFeature.attribute, newFeature.value)
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    const delete_feature = () => {
        setLoading(true);
        axios.delete(server_url+"/api/feature/"+feature.id)
        .then((res)=>{
            console.log(res);
            feature.removeFeature(feature.index);
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false);
        });
    }
    if(loading)
        return (
            <div className=' w-full min-h-[100px] flex items-center justify-center'>
                <ContainerLoader/>
            </div>
    );
  return (
    <div
        className="group h-auto transition-all relative grid grid-cols-2 gap-4 p-4 border-[1.3px] bg-gray-50 
                    rounded-lg hover:bg-gray-100 ">
        <div className="space-y-1">
            <label className="text-xs text-gray-500">
                Attribute
            </label>
            <input
                type="text"
                value={attr}
                onChange={(e) => 
                    // feature.updateFeature(feature.index, 'attribute', e.target.value)
                    setAttr(e.target.value)
                }
                placeholder="e.g., Color, Size, Material"
                className="w-full px-3 py-2 border outline-none rounded-md "
            />
        </div>

        <div className="space-y-1">
            <label className="text-xs text-gray-500">
                Value
            </label>
            <input
                type="text"
                value={value}
                onChange={(e) => 
                    // feature.updateFeature(feature.index, 'value', e.target.value)
                    setvalue(e.target.value)
                }
                placeholder="e.g., Red, XL, Cotton"
                className="w-full px-3 py-2 outline-none border rounded-md "
            />
        </div>

        <button
            onClick={delete_feature}
            className="absolute right-2 top-2 p-2 text-gray-400 
                        hover:text-red-500 opacity-0 group-hover:opacity-100 
                        transition-opacity"
            title="Remove feature"
        >
            <Trash2 className="w-4 h-4" />
        </button>
        { 
          (  attr !== feature.attribute ||
            value !== feature.value)
            &&
            <div className=' h-4'>
                <p className=' text-orange-500 px-10 capitalize'></p>
            <div onClick={Save_changes} className=' hover:cursor-pointer active:scale-90 transition-all absolute
                px-2 flex items-center justify-center
                bg-[#e4f07b] right-2 bottom-2 rounded-lg font-semibold border-[1.4px] shadow   '>
                    save
                </div>
            </div>
        }
    </div>
  )
}

export default EditFeature