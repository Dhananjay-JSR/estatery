import { useState } from "react";

function DropDown() {
    const [isClosed, setIsClosed] = useState(false);
    return <>
        <div className={`float-right relative after:absolute after:text-xs after:content-['▼'] ${isClosed ? 'after:transition-all after:rotate-90' : 'after:rotate-0 after:transition-all'}  w-fit after:right-2 after:top-2 after:rounded-full after:w-4 after:h-4 after:flex after:justify-center after:items-center after:text-[#a19cee] after:bg-[#eeedff]`}>
            <button onClick={(e) => {
                setIsClosed(!isClosed)
            }} className="text-[#909090] font-semibold w-52 p-1 rounded border-[#d4d2ff] border-2 border-solid text-left" >
                Seach With Search Bar
            </button>
        </div>
    </>
}

export default function Headbar() {
    return <>
        <div className="pt-14">
            <div className="inline-block w-fit text-4xl font-bold">Search properties to rent</div>
            <DropDown />
        </div>
    </>
}