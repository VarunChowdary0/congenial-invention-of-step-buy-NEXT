import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface CollapseProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
  className?: string
}

const Collapse: React.FC<CollapseProps> = ({ 
  title, 
  children, 
  defaultOpen = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className={` ${className}`}>
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full  flex items-center justify-between pr-5  transition-colors"
      >
                <div className='px-6 py-3'>
                    <p className=' text-lg text-[#1e3624] font-semibold'>{title}</p>
                </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
            <div className=' border rounded-sm shadow-sm border-[#f0eded]'>
               <ChevronDown className="w-5 h-5 text-black" />
            </div>
        </motion.div>
      </button>
{isOpen &&      <hr className=' border border-[#e1e0e0]' />}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="px-3">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Collapse