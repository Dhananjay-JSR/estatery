import { MutableRefObject, useEffect, useRef, useState } from "react"
import Button from "./modules/Button"

type DefaultGridOptionProps =|{
    type:'button'
    title:string,
    options?:never,
    min?:never,
    max?:never,
    description?:never
}|{
    type:'option',
    title:string,
    options:string[],
    min?:never,
    max?:never,
    description?:never
}|{
    type:'range',
    title:string,
    options?:never,
    min:number,
    max:number,
    description?:never
}|{
    type:'date',
    title:string,
    options?:never,
    min?:never,
    max?:never,
    description:string
}|{
    type:'input',
    title:string,
    min?:never,
    max?:never,
    options?:never,
    description:string
}

function DefaultGridOption(props:DefaultGridOptionProps){
    const ref = useRef() as MutableRefObject<HTMLDivElement>
    const [open,setOpen] = useState(false);
    const [maxVal,setMaxVal] = useState(props.max);
    useEffect(() => {
        const checkIfClickedOutside = (e:any) => {
          if (open && ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [open])
    return <>
   
    {props.type=="input"? 
        <div className="pr-6 pl-6">
        <div className="text-gray-400 font-semibold">{props.title}</div>
        <input type="text" defaultValue={props.description} className="w-44 text-xl text-black font-bold" />
        </div> 
            : (props.type=="date"? 
                <div className="pr-6 pl-6">
                <div className="text-gray-400 font-semibold">{props.title}</div>
                <input type={"text"} placeholder={props.description} onBlur={(e)=>{
                    e.target.type="text"
                }} onFocus={(e)=>{
                    e.target.type="date"
                    // e.target.style.width="100%"
                }} className="placeholder:text-black font-bold w-52 text-xl "/>
                </div> 
                    : (props.type=="range"? 
                        <div className="pr-6 pl-6">
                        <div className="text-gray-400 font-semibold">{props.title}</div>
                        <div className="relative">
                        <button className="font-bold text-xl relative after:absolute after:text-xs after:content-['▼'] w-44  text-left after:right-2 after:top-2 after:rounded-full after:w-4 after:h-4 after:flex after:justify-center after:items-center after:text-[#a19cee] after:bg-[#eeedff]" onClick={()=>{
                            setOpen(!open)
                        }}>${props.min} - ${maxVal}</button>
                        <div ref={ref} className={`${open? "block" : "hidden"} absolute w-fit border-[#d4d2ff] rounded h-fit   border-2 border-solid` }>
                            <input type={'range' } className="bg-purple-400"  defaultValue={100} onChange={(e)=>{
                                setMaxVal(prev => props.min+((props.max-props.min)/100)*e.target.valueAsNumber)
                            }} step={10} />
                            
                        </div>
                        </div>

                        </div> 
                        : 
                            (props.type=="option"? 
                                <>
                                <div className="pr-6 pl-6">
                                <div className="text-gray-400 font-semibold">{props.title}</div>
                                <div className="font-bold text-xl">{props.description}</div>
                                <div className="relative after:absolute after:text-xs after:content-['▼'] w-fit after:right-2 after:top-2 after:rounded-full after:w-4 after:h-4 after:flex after:justify-center after:items-center after:text-[#a19cee] after:bg-[#eeedff]">

                                <select  className="font-bold text-xl appearance-none w-32 " name="housing_option" id="housing_option">{props.options.map(e=>{
                                    return <option  value={e}>{e}</option>
                                })}</select>
                                </div>
                                </div>
                                </>
                                : (props.type=="button"? 
                                <Button variant="dark">Submit</Button>
                                : null))))}
    </>
}

export default function SelectionGrid(){
    return <>
    <div  className=" rounded bg-white mt-8 pt-5 pb-5 grid grid-cols-5 gap-4">
    <DefaultGridOption description="New York,USA" title="Location" type="input"/>
    <DefaultGridOption description="Select Move-in Date" title="When" type="date" />
    <DefaultGridOption min={500} max={2500} title="Price" type="range" />
    <DefaultGridOption options={["House 1","House 2","House 3","House 4"]} title="Property Type" type="option" />
    <DefaultGridOption title="Search" type="button" />
    </div>
    </>
}