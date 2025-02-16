'use client';
import { server_url } from '@/components/Constant';
import PageHeader from '@/components/widgets/PageHeader';
import { Product } from '@/types/item';
import axios from 'axios';
import { Loader2, ArrowUpDown, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(true)
    const [sortConfig, setSortConfig] = useState<{
        key: keyof Product,
        direction: 'asc' | 'desc'
    }>({ key: 'name', direction: 'asc' });

    useEffect(() => {
        axios.get(`${server_url}/api/product/all`)
            .then((res) => {
                setLoading(false);
                setProducts(res.data)
            })
            .catch((error) => {
                console.error('Error fetching products:', error)
                setError('Failed to fetch products')
            })
    }, [])

    const handleSort = (key: keyof Product) => {
        setSortConfig({
            key,
            direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        });

        const sortedProducts = [...products].sort((a, b) => {
            if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        setProducts(sortedProducts);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {error}
            </div>
        )
    }

    return (
        <div className="h-[calc(100vh-60px)]  top-[56px] bg-gray-50">
            <PageHeader title='All Products'>
                <div></div>
            </PageHeader>
            <div className=" w-full">
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-[calc(100vh-100px)] overflow-y-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-200 sticky top-0 z-10">
                            <tr>
                                {[
                                    { key: 'id', label: 'ID' },
                                    { key: 'name', label: 'Name' },
                                    { key: 'actualPrice', label: 'Original Price' },
                                    { key: 'discount', label: 'Discount' },
                                    { key: 'price', label: 'Selling Price' },
                                ].map((column) => (
                                    <th
                                        key={column.key}
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => handleSort(column.key as keyof Product)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {column.label}
                                            <ArrowUpDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                ))}
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>

                            <tbody className="bg-white divide-y  divide-gray-200">
                                {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {product.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {product.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{product.actualPrice.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                {product.discount}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₹{product.price.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => router.push(`/admin/products/edit/${product.id}`)}
                                                className="text-indigo-600 hover:text-indigo-900 inline-flex items-center gap-1"
                                            >
                                                <Pencil className="w-4 h-4" />
                                                Edit
                                            </button>
                                        </td>
                                         </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page