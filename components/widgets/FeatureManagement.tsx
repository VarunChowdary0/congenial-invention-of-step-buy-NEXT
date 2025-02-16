import React, { useState } from 'react'
import { Plus, AlertTriangle } from 'lucide-react'
import EditFeature from '../mini/EditFeature'
import axios from 'axios'
import ContainerLoader from '../mini/ContainerLoader'
import { server_url } from '../Constant'

interface Feature {
    id: string
    productId: string
    attribute: string
    value: string

}

interface FeatureData {
    features: Feature[];
    pid: string;
    setFeaturesData : (data:Feature[])=>void;
}


const FeatureManagement: React.FC<FeatureData> = ({ features ,pid }) => {
    const [Allfeatures, setAllFeatures] = useState<Feature[]>(features);
    const [loading, setLoading] = useState(false);

    // const [TempFeature, setTempFeature] = useState<Feature>();
    const addNewFeature = () => {
        setLoading(true);
        axios.post(server_url+"/api/feature/"+pid,{
            "attribute" : "",
            "value":""
        })
        .then((res)=>{
            const newFeature: Feature = res.data;
            setAllFeatures([...Allfeatures, newFeature]);
        })
        .catch((err)=>{
            console.log(err)
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    const removeFeature = (indexToRemove: number) => {
        setAllFeatures(prev => 
            prev.filter((_, index) => index !== indexToRemove)
        )
    }

    const updateFeature = (index: number, attribute: string , value: string) => {

        const updated:Feature = {
            id: Allfeatures[index].id,
            productId: pid,
            attribute: attribute,
            value: value
        } 
        console.log(index,attribute,value);
        console.log(Allfeatures);
        setAllFeatures(prev => {
            const updatedFeatures = [...prev];
            updatedFeatures[index] = updated;
            return updatedFeatures;
        });
    }
    
    if(loading){
        return <ContainerLoader/>
    }


    return (
        <div className="p-4 space-y-6 py-10 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Product Features</h2>
                <button
                    onClick={addNewFeature}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 
                             rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Feature
                </button>
            </div>

            {Allfeatures.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No features added yet</p>
                    <p className="text-sm text-gray-400">
                        Click &qout;Add Feature&qout; to start adding product features
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Allfeatures.map((feature, index) => (
                        <EditFeature key={index+feature.id}
                            id={feature.id}
                            index={index}
                            attribute={feature.attribute}
                            value={feature.value}
                            updateFeature={updateFeature}
                            removeFeature={removeFeature}
                        />
                    ))}
                </div>
            )}

            {features.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-600">
                        Total Features: {features.length}
                    </p>
                </div>
            )}
        </div>
    )
}

export default FeatureManagement