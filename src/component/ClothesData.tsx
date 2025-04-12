'use client'

import picWomen from "../pic/clothes/women2.webp";
import picKids from "../pic/clothes/kids.jpg";
import picMen from "../pic/clothes/men.jpg";
import Image from "next/image";
import ClothesCard from "@/component/ClothesCard";
import { useContext, useEffect, useState } from "react";
import { ContextP } from "./ContextC";


type elmType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
type dataType = {data:elmType[]}
const ClothesData = ({data}:dataType) => {
    const [showData, setShowData] = useState<elmType[]>(data);
    const contextC = useContext(ContextP);

    useEffect(()=>{
        if(contextC?.clothesL?.length==0 || contextC?.clothesL==null){
            setShowData(data);
        }else{
            setShowData(contextC?.clothesL);
        }
    },[contextC?.clothesL, data]);

    

    return (
        <div>
            <div className="grid grid-cols-3 justify-center items-center">
                <div className="h-full w-full"><Image src={picWomen} alt="picWomen"  /></div>
                <div className=""><Image src={picKids} alt="picWomen"  /></div>
                <div className=""><Image src={picMen} alt="picWomen"  /></div>
            </div>
            <div className="grid grid-cols-4 justify-center items-center">
                {showData.map((elm:elmType, index:number)=>{
                if(elm?.category =="men's clothing" || elm?.category =="women's clothing" ){
                    return <ClothesCard key={index} product={elm} />
                }          
                })}
            </div>
        </div>
    );
}

export default ClothesData;