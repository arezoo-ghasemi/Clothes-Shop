'use client'

import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ContextP } from "./ContextC";
import axios from "axios";


type productType = {productId:string};
const ButtonBuyAndBack = ({productId}:productType) => {
    const router = useRouter();
    const contextC = useContext(ContextP);
    const [BD, setBD] = useState<boolean>(false);

    const handleBuy = async()=>{
        if(contextC?.userId==null || !contextC?.show){
            alert("you must login...");
        }else{
            const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
            const ary = [...res?.data?.BuyL || []];
            if(!contextC?.shopping){
                contextC?.setShopping(true);                
            }
            ary.push({id:productId, num: 1});
            await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {BuyL: ary});
            setBD(true);
        }
    }

    const handleDel = async()=>{
        const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
        const ary = [...res?.data?.BuyL || []];
        const ary2 = ary.filter((item)=>{return item!=productId});
        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {BuyL:ary2});
        setBD(false);
        if(ary2.length==0){
            contextC?.setShopping(false);
        }
    }


    const handleBack = ()=>{
        router.back();
    }

    return (
        <div className="felx mb-7">
            {!BD?<button onClick={handleBuy} className="py-1 px-7 bg-blue-950 text-gray-50 hover:bg-blue-900 hover:cursor-pointer">Add to Buy List</button>: <button onClick={handleDel} className="py-1 px-7 bg-blue-950 text-gray-50 hover:bg-blue-900 hover:cursor-pointer">Delete from Buy List</button>}
            <button onClick={handleBack} className="ml-7 py-1 px-7 bg-blue-950 text-gray-50 hover:bg-blue-900 hover:cursor-pointer">Back</button>
        </div>
    );
}

export default ButtonBuyAndBack;