'use client'

import axios from "axios";
import Image from "next/image";
import picClose from "../pic/close.svg";
import {useEffect, useRef, useState } from "react";



type proType = {proId: {id: string, num:number}, hD:(proId:string)=>void, updateTP: (n:string , m:string)=>void};
type elmType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
const BuyHandle = ({proId, hD, updateTP}:proType) => {

    const [proD, setProD] = useState<elmType|null>(null);
    const [totalP, setTotal] = useState<number>();
    const refNum = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{

        const getData = async()=>{
            try{
                const res = await axios.get(`http://localhost:4000/products/${proId?.id}`);
                setProD(res?.data);
                setTotal(Number(res?.data?.price)*Number(proId?.num));
            }catch{

            }
            
        }
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleChangeT = ()=>{        
        if(Number(refNum?.current?.value)>=1){
            const res = Number(proD?.price)*Number(refNum?.current?.value);
            setTotal(res);
            if(typeof(refNum?.current?.value)=="string"){
                updateTP(refNum?.current?.value, proId?.id);
            }           
        }       
    }


    return (
        <div className="flex flex-row gap-4 w-full border-b-1 items-center">
            {proD?.image!=null ? <Image src={proD?.image} alt="productImage" width={30} height={30} />:""}
            <h2 className="">{proD?.title}</h2>
            <h2>{`Base price : ${proD?.price} `}</h2>
            <input ref={refNum} className="border-1" type="number" name="num" id="num"  min={1} defaultValue={proId?.num} onChange={handleChangeT}/>
            <h2>{`Total price: ${totalP}`}</h2>
            <Image src={picClose} alt="close" width={20} height={20} onClick={()=>{hD(proId?.id)}} className="hover:cursor-pointer"/>
        </div>
    );
}

export default BuyHandle;