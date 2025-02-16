import React, { useEffect, useState } from 'react'
import { Plus, AlertTriangle, X } from 'lucide-react'
import axios from 'axios'
import ContainerLoader from '../mini/ContainerLoader'
import { server_url } from '../Constant'
import { Category } from '@/types/item'
import { div } from 'framer-motion/client'

interface CategoryData {
    categories: Category[]
    pid: string
    setCategoriesData: (data: Category[]) => void
}

const CategoryManagement: React.FC<CategoryData> = ({ categories, pid }) => {
    const [allCategories, setAllCategories] = useState<Category[]>(categories)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [suggestions, setSuggestions] = useState<Category[]>([])
    const [selectedIndex, setSelectedIndex] = useState(-1)


    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (searchTerm.trim()) {
                searchCategories(searchTerm)
            } else {
                setSuggestions([])
            }
        }, 300);

        return () => clearTimeout(debounceTimer)
    }, [searchTerm])

    const removeCategory = async (categoryId: string) => {
        setLoading(true)
        axios.delete(`${server_url}/api/category/link/${categoryId}/${pid}`)
            .then(() => {
            setAllCategories(prev => prev.filter(cat => cat.id !== categoryId))
            })
            .catch(err => {
            console.error(err)
            })
            .finally(() => {
            setLoading(false)
            })
    }

    const searchCategories = async (term: string) => {
        axios.get(`${server_url}/api/Category/${term}`)
            .then(response => {
            const filteredSuggestions = response.data.filter(
                (cat: Category) => !allCategories.some(existing => existing.id === cat.id)
            )
            setSuggestions(filteredSuggestions)
            })
            .catch(err => {
            console.error(err)
            setSuggestions([])
            })
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex(prev => 
                prev < suggestions.length - 1 ? prev + 1 : prev
            )
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault()
            addCategory(suggestions[selectedIndex].name)
        }
    }

    const addCategory = (category:string) => {
        if (!category) return
        setLoading(true)
        axios.post(`${server_url}/api/category/${pid}`, {
            name: category
        })
        .then(response => {
            console.log(response.data)
            setAllCategories([...allCategories, response.data.result])
            setSearchTerm('')
            setSuggestions([])
            setSelectedIndex(-1)
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    if (loading) {
        return (
            <div className=' w-full h-[200px] flex items-center justify-center'>
                 <ContainerLoader />
            </div>
        );
    }

    return (
        <div className="p-4 space-y-6 py-10 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Product Categories</h2>
                <div className="relative w-64">
                   <div className=' flex gap-3 items-center justify-center'>
                   <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Search categories..."
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                                 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {
                        searchTerm.length !== 0 && (
                    <button onClick={()=>{
                        addCategory(searchTerm);
                    }} className=' border-[1.4px] active:scale-90 transition-all
                     bg-[#e4f07b] px-2 py-1 rounded-md'>
                        <Plus className="w-4 h-4 text-blue-600" />  
                    </button>
                        )
                    }
                   </div>
                    {suggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg 
                                      shadow-lg max-h-60 overflow-auto">
                            {suggestions.map((category, index) => (
                                <div
                                    key={category.id+index}
                                    onClick={() => addCategory(category.name)}
                                    className={`px-4 py-2 cursor-pointer flex items-center 
                                              justify-between ${
                                        index === selectedIndex 
                                            ? 'bg-blue-50 text-blue-600' 
                                            : 'hover:bg-gray-100'
                                    }`}
                                >
                                    <span>{category.name}</span>
                                    <Plus className="w-4 h-4 text-blue-600" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {allCategories.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No categories added yet</p>
                    <p className="text-sm text-gray-400">
                        Search and select categories to add them to the product
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {allCategories.map(category => (
                        <div
                            key={category.id}
                            className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 
                                     text-blue-600 rounded-full"
                        >
                            <span>{category.name}</span>
                            <button
                                onClick={() => removeCategory(category.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 hover:text-red-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {allCategories.length > 0 && (
                <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-600">
                        Total Categories: {allCategories.length}
                    </p>
                </div>
            )}
        </div>
    )
}

export default CategoryManagement