import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { CgClose } from 'react-icons/cg';

const PopUp = ({ loading, children }: { loading: boolean; children: React.ReactNode}) => {
    const router = useRouter();

    const closeModal = () => {
      router.back(); // Go back to the previous page (removes modal from URL)
    };

    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeModal();
        }
      };

      // Add event listener when component mounts
      document.addEventListener('keydown', handleEscapeKey);

      // Remove event listener when component unmounts
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }, []);
  
    return (
        <div className="fixed py-48 flex items-center justify-center
          z-[2000] inset-0 bg-black bg-opacity-50">
          <div className="bg-white w-fit h-fit p-5 rounded-lg shadow-lg">
            <button className="z-[2100] absolute top-10 right-10" onClick={closeModal}>
              <CgClose className='h-10 w-10 text-white'/>
            </button>
            <div className=" max-h-[80vh] overflow-y-auto">
                {children}
            </div>
            {
              loading &&     
              <div className="flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin z-[3000]" />          
              </div>
            }
          </div>
        </div>
    );
}

export default PopUp