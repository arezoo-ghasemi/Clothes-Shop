'use client'

import ClothesCard from "@/component/ClothesCard";
import { ContextP } from "@/component/ContextC";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

type elmType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
const Page = () => {
    const contextC = useContext(ContextP);
    const [ary, setAry] = useState<elmType[] | null>([]);

    useEffect(()=>{
        const getData = async ()=>{
            const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`); 
            const ary2 = [];
            for(const elm of res?.data?.fav){
                const resD = await axios.get(`http://localhost:4000/products/${elm}`);
                ary2.push(resD?.data);
            }
            setAry(ary2);
                      
        }
        getData();
    },[contextC?.userId]);


    return (
        <div className="grid grid-cols-4 justify-center items-center">
            {
                ary!=null ? ary.map((elm:elmType, index:number)=>{
                    return <ClothesCard key={index} product={elm} />
                }):""
            }
        </div>
    );
}

export default Page;