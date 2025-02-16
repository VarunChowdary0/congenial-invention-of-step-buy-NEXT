import React from 'react'

interface curr{
    value: number;
    placeholder: string;
    lable : any;
    id : string;
    diasbled? : boolean;
    setter? : React.Dispatch<React.SetStateAction<number>> | ((e: any) => void);
}
const ExtreLabledInputNumber:React.FC<curr> = (props) => {
  return (
    <div className=' relative'>
        <input type="number" 
            onChange={(e) => props.setter?.(parseInt(e.target.value))}
            disabled={props.diasbled}
            id={props.id}
            value={props.value}
            placeholder={props.placeholder || "Placeholder"}
            className={` px-4 pl-10 shadow-sm outline-none 
            focus:border-[1.3px] transition-all focus:border-[#d5d4d4]
            tracking-wide w-full border p-2 rounded-md ${props.diasbled && "hover:cursor-not-allowed"}`}/>
            <div className="absolute left-0 top-0 bottom-0 w-fit
            flex items-center justify-center bg-black/0 font-semibold">
            {props.lable}
        </div>
    </div>
  )
}

export default ExtreLabledInputNumber