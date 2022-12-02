import Navbar from "../components/Navbar";
import Head from "next/head";
import Headbar from "../components/Headbar";
import SelectionGrid from "../components/SelectionGrid";
export default function Home(){

  return  <><Head>
    <title>Estary</title>
  </Head>
    <div className="bg-[#f8f8ff] fixed h-full w-full">
  <Navbar />
  <div className="h-[100%] pl-32 pr-32 ">
  <Headbar/>
  <SelectionGrid/>
  </div>
    </div>
  </>
}