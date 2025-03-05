import { DebouncedFunc } from 'lodash';
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

interface SearchWidgetProps {
    childrenHead?: React.ReactNode;
    childrenSub?: React.ReactNode;
    query?: string;
    setQuery?: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: DebouncedFunc<(query: string) => Promise<void>>;

    setFullBox : React.Dispatch<React.SetStateAction<boolean>>;
}
const SearchWidget: React.FC<SearchWidgetProps> = ({childrenHead,childrenSub,query,setQuery,handleSearch,setFullBox}) => {
    const router = useRouter();
  return (
    <div
    onFocus={() => setFullBox(true)}
    onMouseDown={(e) => {
      if (!e.currentTarget.contains(e.target as Node)) {
        setFullBox(false);
      }
    }}
    className=' flex-1 bg-slate-600/0 max-sm:hidden pr-10 w-fit flex justify-center'>
        <div className=' text-white h-full relative'>
            <input
                autoComplete='off'
                value={query} 
                onChange={(e) => {
                        handleSearch(e.target.value);
                        setQuery?.(e.target.value)
                    }
                }
                onKeyDown={(e) => {
                    if(e.key === 'Enter'){
                        router.push(`/search?key=${query}`);
                        setFullBox(false);
                    }
                }}
                placeholder='Search for Products, Brands and More'
                className=' 
                font-semibold hover:bg-[#2a2929] hover:text-white hover:ring-4 hover:ring-[#6571e0]
                active:ring-[#6571e0] transition-all duration-300  tracking-wider text-md
                 pl-3 pr-20 py-3 rounded min-w-[40vw] text-sm outline-none bg-[#2a2929]'
                type="text" 
                id='search'
            />
           
            {childrenSub}
            <div className='absolute right-[-4px] top-1 flex gap-2 '>
                <div onClick={()=>{
                            router.push(`/search?key=${query}`);
                            setFullBox(false);
                }} className=" ring-0 h-9 border-[1.4px] rounded-lg  font-medium text-black w-9
                bg-[#ffffff] hover:bg-[#2a2929] hover:cursor-pointer hover:ring-4 
                hover:ring-[#6571e0] duration-300 outline-none hover:text-white flex items-center
                justify-between px-2 transition-all">
                    <SearchIcon/>
                </div>
                {childrenHead}
            </div>
            
        </div>
    </div>
  )
}

export default SearchWidget