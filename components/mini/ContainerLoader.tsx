import { Loader2 } from 'lucide-react'
import React from 'react'


const ContainerLoader = () => {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
            <Loader2 className="w-8 h-8 animate-spin z-[3000]" />
    </div>
  )
}

export default ContainerLoader