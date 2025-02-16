import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {}

const ContainerLoader = (props: Props) => {
  return (
    <div className=' w-full h-full flex items-center justify-center'>
            <Loader2 className="w-8 h-8 animate-spin z-[3000]" />
    </div>
  )
}

export default ContainerLoader