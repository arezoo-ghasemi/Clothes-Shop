'use client'

import BuyHandle from "@/component/BuyHandle";
import { ContextP } from "@/component/ContextC";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState} from "react";

type elmType = {id:string, num:number};
const  Page = () => {

    const contextC = useContext(ContextP);
    const [ary, setAry] = useState<elmType[]>([]);
    const [Tprice, setTprice] = useState<number>(0);
    const router = useRouter();

    useEffect(()=>{
        const getData = async ()=>{
            try{
                const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
                if(res?.data?.BuyL){
                    setAry(res?.data?.BuyL);
                    let sum =0;
                    for(const element of ary){
                        const res = await axios.get(`http://localhost:4000/products/${element?.id}`);        
                        sum = (Number(res?.data?.price)*Number(element?.num)) + sum; 
                    }
                    setTprice(sum); 
                } 
            }catch{
                
            }
           
        }
        getData(); 
        
    },[ary, contextC?.userId]);

    const updateTotalP = async(num:string, proId:string)=>{
        let sum =0;
        const resD = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
        const ary = [...(resD?.data?.BuyL) || []];
        const ary2 =[];
        for(const elm of ary){
            if(elm?.id==proId){
                ary2.push({id:elm?.id, num:num});
            }else{
                ary2.push(elm);
            }
        }
        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {BuyL: ary2});
        for(const element of ary2){
            const res = await axios.get(`http://localhost:4000/products/${element?.id}`);        
            sum = (Number(res?.data?.price)*Number(element?.num)) + sum; 
        }      
        console.log(sum);       
        setTprice(sum); 

    }

    const handleDelete = async(proId:string)=>{        
        const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
        const ary = [...(res?.data?.BuyL || [])];
        const ary2 = ary.filter((item)=>{return item?.id!=proId});
        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {BuyL:ary2});
        setAry(ary2);
    }

    const handlePayButton = async()=>{
        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {BuyL:[]});
        alert("Price pay successfully...");
        contextC?.setShopping(false);
        router.push("http://localhost:3000");
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col my-7 border-1 border-b-0 w-2/3 ">
                {ary?.map((elm:elmType, index:number)=>{
                    return <BuyHandle key={index} proId={elm} hD={handleDelete} updateTP={updateTotalP} />
                })}
            </div>
            <div className="border-1 w-2/3 ">
                <div className="flex justify-between ">
                    <h2 className="ml-7">{`Total price : ${Tprice}`}</h2>
                    <button onClick={handlePayButton} className=" mr-7 px-16 py-1 bg-blue-950 text-gray-50 hover:bg-blue-900 hover:cursor-pointer">Pay</button>
                </div>
            </div>
        </div>
    );
}

export default Page;