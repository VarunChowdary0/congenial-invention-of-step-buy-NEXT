import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { CgClose } from 'react-icons/cg';
interface PopUpProps {
  loading: boolean;
  children: React.ReactNode;
  dark? : boolean; 
  onClose?: () => void;
}
const PopUp:React.FC<PopUpProps> = ({loading,children,onClose,dark}) => {
    const router = useRouter();

    const closeModal = () => {
      router.back();
    };

    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        // document.body.classList.add('popup-open');
        if (event.key === 'Escape') {
          if(!onClose){
            closeModal();
          }else{
            onClose();
          }
        }
      };
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        // document.body.classList.remove('popup-open');

      };
    }, []);
  
    return (
        <div className="fixed py-48 flex items-center justify-center
          z-[2000] inset-0 bg-black/70 backdrop-blur-sm">
          <div className={`bg-${dark?"[#09090b]":"white"} ${dark?"border-[0.5px] border-[#2a2929]":""} 
          w-fit h-fit rounded-lg shadow-lg`}>
            <button className="z-[2100] absolute top-10 right-10" onClick={()=>{
              if(!onClose){
                closeModal();
              }else{
                onClose();
              }
            }}>
              <CgClose className='h-10 w-10 text-white'/>
            </button>
            <div className=" max-h-[90vh] overflow-y-auto">
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