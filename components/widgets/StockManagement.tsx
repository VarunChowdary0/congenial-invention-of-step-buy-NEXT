import React from 'react'
import { AlertTriangle } from 'lucide-react'
import ExtreLabledInputNumber from '../mini/ExtreLabledInputNumber'
import { FaProductHunt } from 'react-icons/fa'

interface StockData {
    stock: number;
    setStock:React.Dispatch<React.SetStateAction<number>>;
    isAvailable: boolean;
    setIsAvailable: React.Dispatch<React.SetStateAction<boolean>>;
    lowStockThreshold: number
    setLowStockThreshold: React.Dispatch<React.SetStateAction<number>>;
}

interface StockManagementProps {
    StockData: StockData
}

const StockManagement: React.FC<StockManagementProps> = ({ StockData }) => {

    return (
        <div className="p-4 space-y-6 py-10 rounded-lg shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Stock Amount */}
                <div className="space-y-2">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                        Current Stock
                    </label>
                    <ExtreLabledInputNumber
                        id="stock"
                        value={StockData.stock}
                        setter={StockData.setStock}
                        placeholder="Enter stock amount"
                        lable={
                            <div className=' w-10 bg-black/0 h-10 flex items-center justify-center'>
                                <FaProductHunt className=''/>
                            </div>
                        }
                    />
                </div>

                {/* Low Stock Threshold */}
                <div className="space-y-2">
                    <label htmlFor="threshold" className="block text-sm font-medium text-gray-700">
                        Low Stock Alert Threshold
                    </label>
                    <ExtreLabledInputNumber
                        id="threshold"
                        value={StockData.lowStockThreshold}
                        setter={StockData.setLowStockThreshold}
                        placeholder="Set threshold"
                        lable={
                            <div className=' w-10 bg-black/0 h-10 flex items-center justify-center'>
                            <FaProductHunt className=''/>
                        </div>
                        }
                    />
                </div>
            </div>

            {/* Availability Toggle */}
            <div className="flex items-center space-x-3 mt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={StockData.isAvailable}
                        onChange={(e) => StockData.setIsAvailable(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                                  peer-focus:ring-blue-300 rounded-full peer 
                                  peer-checked:after:translate-x-full peer-checked:after:border-white 
                                  after:content-[''] after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:border-gray-300 after:border after:rounded-full 
                                  after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600">
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-700">
                        Product Available for Sale
                    </span>
                </label>
            </div>

            {/* Stock Status */}
            {StockData.stock <= StockData.lowStockThreshold && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-md flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-yellow-700 font-medium">Low Stock Alert</p>
                        <p className="text-sm text-yellow-600">
                            Current stock ({StockData.stock} units) is below the threshold ({StockData.lowStockThreshold} units)
                        </p>
                    </div>
                </div>
            )}

            {/* Out of Stock Warning */}
            {StockData.stock === 0 && (
                <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-sm text-red-700 font-medium">Out of Stock</p>
                        <p className="text-sm text-red-600">
                            This product is currently out of stock and {"won't"} be visible to customers
                        </p>
                    </div>
                </div>
            )}

        </div>
    )
}

export default StockManagement