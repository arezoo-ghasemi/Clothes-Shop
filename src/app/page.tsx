import picWomen from "../pic/clothes/women2.webp";
import picKids from "../pic/clothes/kids.jpg";
import picMen from "../pic/clothes/men.jpg";
import Image from "next/image";
import ClothesCard from "@/component/ClothesCard";

const getData = async ()=>{
  const res = await fetch('http://localhost:4000/products')
  .then(res=>res.json());
  return res;

}

type elmType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
export default async function Home() {
  const clothesData = await getData();
  
  return (
    <>
      <div className="grid grid-cols-3 justify-center items-center">
        <div className="h-full w-full"><Image src={picWomen} alt="picWomen"  /></div>
        <div className=""><Image src={picKids} alt="picWomen"  /></div>
        <div className=""><Image src={picMen} alt="picWomen"  /></div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center">
        {clothesData.map((elm:elmType, index:number)=>{
          if(elm?.category =="men's clothing" || elm?.category =="women's clothing" ){
            return <ClothesCard key={index} product={elm} />
          }          
        })}
      </div>
    </>
  );
}
