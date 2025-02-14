import React from 'react'

interface FiltersProps {
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    selectedCategory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
    priceRange: number
    setPriceRange: React.Dispatch<React.SetStateAction<number>>
}
const Filters:React.FC<FiltersProps> = (
    {searchQuery,
        setSearchQuery,
        selectedCategory,
        priceRange,
        setPriceRange,
        setSelectedCategory}) => {
  return (

    <>
                  {/* Search and Filters */}
      <div className="max-w-7xl mx-auto mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="p-3 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="programming">Programming Kits</option>
            <option value="robotics">Robotics</option>
            <option value="accessibility">Accessibility Tools</option>
          </select>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Price Range: ₹{priceRange}</span>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

export default Filters