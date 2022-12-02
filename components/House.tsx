import HouseImage from './assets/homeAsset.jpg'
import Image from 'next/image'
import heartOn from './assets/heart_on.png';
import heartOff from './assets/heart_off.png'
import areaSvg from './assets/area.svg'
import bathroomSvg from './assets/bathroom.svg'
import bedroomSvg from './assets/bed.svg'
import { useState } from 'react';
interface HouseProps {
    Price: number,
    ImageURL: string,
    Name: string,
    Address: string,
    BedNumber: number,
    Bathroom: number,
    Area: [number, number],
    isPopular?: boolean
}
export default function House({ Price, Name, Address, ImageURL, BedNumber, Bathroom, Area, isPopular }: HouseProps) {
    const [isFav, setIsFav] = useState(false)
    const newPrice = Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return <div className='rounded-md bg-white w-fit'>
        <div className='relative'>
            <Image src={ImageURL as string} draggable={false} className="rounded-t-md " alt="House Image" width={370} height={200} />
            {isPopular ? <div className='absolute bottom-[-5%] -left-2'>
                <div className='w-fit pl-4 pr-4 bg-[#9088fd] text-white rounded-tl-md rounded-tr-md rounded-br-md '>
                    ✷ Popular
                </div>
                <div className='absolute border-t-[12px] border-l-[12px] border-l-transparent border-t-[#574bff]'></div>
            </div> : null}
        </div>
        <div className='w-[370px] '>
            <div className=' mt-6 mb-2 ml-5 mr-5'>
                <div className='w-fit inline-block'>
                    <div className='text-[#4f45da]   w-fit inline-block font-bold text-2xl'>
                        ${newPrice}
                    </div>
                    <div className='inline-block text-gray-500 font-medium'>
                        /month
                    </div>
                </div>
                <div className='float-right inline-block'>
                    <button onClick={() => {
                        setIsFav(!isFav)
                    }} className='p-1 border-2 border-[#c3c3c3] rounded-full w-fit active:scale-110 transition-all active:transition-all'>

                        <Image className=' ' draggable={false} src={isFav ? heartOn as unknown as string : heartOff as unknown as string} alt="Heart Icon" width={20} height={20} />
                    </button>
                </div>
            </div>
            <div className='text-2xl font-bold ml-5 mr-5'>
                {Name}
            </div>
            <div className='text-clip ml-5 mr-5 text-sm text-gray-400 font-semibold'>

                {Address}

            </div>
            <hr className='ml-5 mr-5 mt-3 mb-3' />
            <div className='ml-5 mr-5 flex justify-between mb-3'>
                <div>
                    <Image className='inline-block' draggable={false} src={bedroomSvg as unknown as string} alt="Bedroom Icon" width={20} height={20} />
                    <div className='inline-block text-xs font-semibold text-gray-600 ml-3'>

                        {BedNumber.toString()} Beds
                    </div>
                </div>
                <div>
                    <Image className='inline-block' draggable={false} src={bathroomSvg as unknown as string} alt="Bedroom Icon" width={20} height={20} />
                    <div className='inline-block text-xs font-semibold text-gray-600 ml-3'>

                        {Bathroom.toString()} Bathrooms
                    </div>
                </div>
                <div>
                    <Image className='inline-block' src={areaSvg as unknown as string} alt="Bedroom Icon" width={20} height={20} />
                    <div className='inline-block text-xs font-semibold text-gray-600 ml-3'>
                        {Area[0]}x{Area[1]} m
                        <div className='inline-block align-top text-[9px]'>2</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}