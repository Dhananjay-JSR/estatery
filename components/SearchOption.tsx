import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react"
import Button from "./modules/Button"

type DefaultGridOptionProps = | {
    type: 'button'
    title: string,
    options?: never,
    min?: never,
    max?: never,
    localRef?:never,
    inputSetter: Dispatch<SetStateAction<string>>,
    optionSetter:Dispatch<SetStateAction<boolean>>,
    localRefObjects: [MutableRefObject<string | undefined>, MutableRefObject<boolean | undefined>],
    description?: never,
    setMaxRange: Dispatch<SetStateAction<number>>,
    setMinRange: Dispatch<SetStateAction<number>>,
    maxRef: MutableRefObject<number>
} | {
    type: 'option',
    title: string,
    options: string[],
    min?: never,
    max?: never,
    localRef:MutableRefObject<boolean|undefined>,
    inputSetter?: never,
    optionSetter?:never,
    localRefObjects?: never,
    description?: never,
    setMaxRange?: never,
    setMinRange?: never,
    maxRef?: never
} | {
    type: 'range',
    title: string,
    options?: never,
    min: number,
    max: number,
    localRef?:never,
    inputSetter?: never,
    optionSetter?:never,
    localRefObjects?: never,
    description?: never,
    setMaxRange?: never,
    setMinRange?: never,
    maxRef: MutableRefObject<number>
} | {
    type: 'date',
    title: string,
    options?: never,
    min?: never,
    max?: never,
    localRef?:never,
    inputSetter?: never,
    optionSetter?:never,
    localRefObjects?: never,
    description: string,
    setMaxRange?: never,
    setMinRange?: never,
    maxRef?: never
} | {
    type: 'input',
    title: string,
    min?: never,
    max?: never,
    localRef:MutableRefObject<string | undefined>,
    inputSetter?: never,
    optionSetter?:never,
    localRefObjects?: never,
    options?: never,
    description: string,
    setMaxRange?: never,
    setMinRange?: never,
    maxRef?: never
}

function DefaultGridOption(props: DefaultGridOptionProps) {
    const ref = useRef() as MutableRefObject<HTMLDivElement>
    const [open, setOpen] = useState(false);
    const [maxVal, setMaxVal] = useState(props.max);
    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
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

        {props.type == "input" ?
            <div className="pr-6 pl-6">
                <div className="text-gray-400 font-semibold">{props.title}</div>
                <input onChange={(e)=>{
                    props.localRef.current = e.target.value
                }} type="text" aria-label="Address Location" placeholder={props.description} defaultValue="New York,USA" className="w-44 text-xl text-black font-bold " />
            </div>
            : (props.type == "date" ?
                <div className="pr-6 pl-6">
                    <div className="text-gray-400 font-semibold">{props.title}</div>
                    <input type={"text"} placeholder={props.description} onBlur={(e) => {
                        e.target.type = "text"
                    }} onFocus={(e) => {
                        e.target.type = "date"
                    }} className="placeholder:text-black font-bold w-52 text-xl " />
                </div>
                : (props.type == "range" ?
                    <div className="pr-6 pl-6">
                        <div className="text-gray-400 font-semibold">{props.title}</div>
                        <div className="relative">
                            <button className="font-bold text-xl relative after:absolute after:text-xs after:content-['▼'] w-44  text-left after:right-2 after:top-2 after:rounded-full after:w-4 after:h-4 after:flex after:justify-center after:items-center after:text-[#a19cee] after:bg-[#eeedff]" onClick={() => {
                                setOpen(!open)
                            }}>${props.min} - ${maxVal}</button>
                            <div ref={ref} className={`${open ? "block" : "hidden"} absolute w-fit border-[#d4d2ff] rounded h-fit   border-2 border-solid`}>
                                <input type={'range'} max={100} min={0} className="bg-purple-400" defaultValue={100} onChange={(e) => {
                                    setMaxVal(prev => props.min + ((props.max - props.min) / 100) * e.target.valueAsNumber)
                                    props.maxRef.current = props.min + ((props.max - props.min) / 100) * e.target.valueAsNumber
                                }} step={10} />
                            </div>
                        </div>

                    </div>
                    :
                    (props.type == "option" ?
                        <>
                            <div className="pr-6 pl-6">
                                <div className="text-gray-400 font-semibold">{props.title}</div>
                                <div className="font-bold text-xl">{props.description}</div>
                                <div className="relative after:absolute after:text-xs after:content-['▼'] w-fit after:right-2 after:top-2 after:rounded-full after:w-4 after:h-4 after:flex after:justify-center after:items-center after:text-[#a19cee] after:bg-[#eeedff]">
                                    <select onChange={(e)=>{
                                        if (e.target.value=="All"){
                                            props.localRef.current=false
                                        }else{
                                            props.localRef.current=true
                                        }
                                    }} defaultValue={"none"} className="font-bold text-xl appearance-none w-36 " name="housing_option" id="housing_option">
                                    <option value="none" disabled hidden>none</option>
                                        {props.options.map((e, index) => {
                                        return <option key={index} value={e}>{e}</option>
                                    })}
                                    </select>
                                </div>
                            </div>
                        </>
                        : (props.type == "button" ?
                            <Button variant="dark" onClick={() => {
                                props.setMaxRange(props.maxRef.current)
                                if (props.localRefObjects[0].current){
                                    props.inputSetter(props.localRefObjects[0].current)
                                }else{
                                    props.inputSetter('')
                                }
                                if (props.localRefObjects[1].current){
                                    props.optionSetter(props.localRefObjects[1].current)
                                }else{
                                    props.optionSetter(false)
                                }
                                
                            }}>Submit</Button>
                            : null))))}
    </>
}

export default function SearchOption({ setMaxRange, setMinRange,LocationSetter,PopularTypeSetter }: { setMaxRange: Dispatch<SetStateAction<number>>, setMinRange: Dispatch<SetStateAction<number>>,LocationSetter: Dispatch<SetStateAction<string>>,PopularTypeSetter: Dispatch<SetStateAction<boolean >> }) {
    const MaxCountRef = useRef(5000);
    const LocationValue = useRef<string>();
    const OptionValue = useRef<boolean>()
    return <>
        <div className=" rounded-lg bg-white mt-8 pt-5 pb-5 grid grid-cols-5 gap-4">
            <DefaultGridOption localRef={LocationValue} description="Enter Location" title="Location" type="input" />
            <DefaultGridOption description="Select Move-in Date" title="When" type="date" />
            <DefaultGridOption maxRef={MaxCountRef} min={500} max={5000} title="Price" type="range" />
            <DefaultGridOption localRef={OptionValue} options={["Popular","All"]} title="Property Type" type="option" />
            <DefaultGridOption localRefObjects={[LocationValue,OptionValue]} inputSetter={LocationSetter} optionSetter={PopularTypeSetter} maxRef={MaxCountRef} setMaxRange={setMaxRange} setMinRange={setMinRange} title="Search" type="button" />
        </div>
    </>
}