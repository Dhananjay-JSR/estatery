import Button from "./modules/Button";
import logo from './assets/logo.png'
import Image from "next/image";
type HyperLinkProps = {
    children: string,
    active?: true,
    dropdown?: never
} | {
    children: string,
    dropdown?: true,
    active?: never
}
function HyperLinks(props: HyperLinkProps) {
    const isActive = props.active || false
    const isDropDown = props.dropdown || false
    return <button className={`font-semibold ${isActive ? "text-[#4f45da] bg-[#eeedff]" : "text-black"} ${isDropDown ? "after:content-['⮟']  after:ml-1" : ""}  ml-3 mr-3 min-w-[70px] rounded  h-9 flex justify-center items-center `}>{props.children}</button>
}

function LeftModule() {
    return <div className="flex items-center w-fit">
        <div className="flex ml-10 mr-10">

            <Image height={'40'} src={logo as unknown as string} alt="Image Logo" />
            <div className="flex justify-center items-center font-bold text-[#383478]">

                Estatery
            </div >
        </div>
        <HyperLinks active>
            Rent
        </HyperLinks>
        <HyperLinks >
            Buy
        </HyperLinks>
        <HyperLinks >
            Sell
        </HyperLinks>
        <HyperLinks dropdown>
            Manage Property
        </HyperLinks>
        <HyperLinks dropdown>
            Resource
        </HyperLinks>
    </div>
}

function RightModule() {
    return <div ><Button variant="light">Login</Button><Button variant="dark">Sign Up</Button></div>
}

export default function Navbar() {
    return <><div className="p-4 flex justify-between bg-white"><LeftModule /><RightModule /></div><hr /></>
}