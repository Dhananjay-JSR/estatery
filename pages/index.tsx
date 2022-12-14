import Navbar from "../components/Navbar";
import Head from "next/head";
import Headbar from "../components/Headbar";
import SearchOption from "../components/SearchOption";
import HouseComponent from "../components/House";
import { GetStaticProps } from 'next'
import {  useMemo, useState } from "react";

interface House {
  Name: string,
  ImageUrl: string,
  price: number,
  Address: string,
  BedCount: number,
  BathroomCount: number,
  AreaCount: [number, number],
  isPopular?: boolean,
}
export default function Home({ Data }: { Data: House[] }) {
  const [maxRange, setMaxRange] = useState(5000);
  const [minRange, setMinRange] = useState(500);
  const [isOpened,setIsOpened] = useState(true);
  const [LocationText,setLocationText] = useState<string>('');
  const [PopularType,setPopularType] = useState<boolean>(false);
  const CacheData = useMemo(()=>{
    return Data.filter(e=>{
      if (PopularType){
        return e.isPopular
      }else{
        return true
      }
    }).filter(z=>{
      return  z.price<=maxRange && z.Address.includes(LocationText)
    })
  },[Data,maxRange,LocationText,PopularType])
  return <><Head>
    <title>Estary</title>
  </Head>
    <div className="bg-[#f8f8ff]">
      <Navbar />
      <div className="pl-32 pr-32 ">
        <Headbar setOptionVisible={setIsOpened} />
{isOpened? <SearchOption LocationSetter={setLocationText} PopularTypeSetter={setPopularType} setMaxRange={setMaxRange} setMinRange={setMinRange} /> : null}
        <div className="grid grid-cols-3 mt-11 gap-9 justify-items-center">
          {
            CacheData.length!= 0 ? CacheData.map((f,index)=>{
              return <HouseComponent key={index} Name={f.Name} isPopular={f.isPopular} ImageURL={f.ImageUrl} Price={f.price} Address={f.Address} BedNumber={f.BedCount} Bathroom={f.BathroomCount} Area={f.AreaCount} />
            }) : <div className="text-2xl font-bold text-center w-full text-[#6f66ef]">No House Found</div>
          }
        </div>
      </div>
    </div>
  </>
}
export const getStaticProps: GetStaticProps = async (context) => {
  const Data: House[] = [
    {
      Name: "Palm Harbour",
      price: 1500,
      ImageUrl: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "2699 Green Valley, Highland Lake, FL",
      BedCount: 3,
      BathroomCount: 2,
      AreaCount: [5, 7],
      isPopular: true
    }, {
      Name: "Beverly SpringField",
      ImageUrl: "https://images.pexels.com/photos/1500459/pexels-photo-1500459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 2700,
      Address: "2821 Lake Sevilla, Palm Harbor, TX",
      BedCount: 4,
      BathroomCount: 2,
      AreaCount: [6, 7.5],
      isPopular: true
    }, {
      Name: "Faulkner Ave",
      price: 4550,
      ImageUrl: "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "909 Woodland St, Michigan, IN",
      BedCount: 4,
      BathroomCount: 3,
      AreaCount: [8, 10],
      isPopular: true
    }, {
      Name: "Palm Harbour",
      ImageUrl: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 2400,
      Address: "210 US Highway, Highland Lake, FL",
      BedCount: 4,
      BathroomCount: 2,
      AreaCount: [6, 8],
      isPopular: false
    }, {
      Name: "Cove Red",
      price: 1500,
      ImageUrl: "https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "243 Curlew Road, Palm Harbor, TX",
      BedCount: 2,
      BathroomCount: 1,
      AreaCount: [5, 7.5],
      isPopular: false
    }, {
      Name: "The Old Steele",
      "ImageUrl": "https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "103 Lake Shores, Michigan, IN",
      price: 1600,
      BedCount: 6,
      BathroomCount: 3,
      AreaCount: [5, 7],
      isPopular: false
    }, {
      Name: "St. Crystal",
      price: 2400,
      ImageUrl: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "210 US Highway, Highland Lake, FL",
      BedCount: 4,
      BathroomCount: 2,
      AreaCount: [6, 8],
      isPopular: false
    }, {
      Name: "Cove Red",
      price: 1500,
      ImageUrl: "https://images.pexels.com/photos/206172/pexels-photo-206172.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "243 Curlew Road, Palm Harbor, TX",
      BedCount: 2,
      BathroomCount: 1,
      AreaCount: [5, 7.5],
      isPopular: false

    }, {
      Name: "Tarpon Bay",
      price: 1600,
      ImageUrl: "https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      Address: "103 Lake Shores, Michigan, IN",
      BedCount: 3,
      BathroomCount: 1,
      AreaCount: [5, 7],
      isPopular: false
    }
  ]
  return {
    props: {
      Data
    }
  }

}