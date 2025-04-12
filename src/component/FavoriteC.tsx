'use client'

import Image from "next/image";
import picFavoritEmpty from "../pic/favorite-empty.svg";
import picFavoriteFilled from "../pic/favorite-filled.svg";
import { useContext, useState } from "react";
import axios from "axios";
import { ContextP } from "./ContextC";

type clothesType = {clothesId:number | undefined};
function FavoriteC({clothesId}:clothesType) {
    const [fav,setFav] = useState(picFavoritEmpty);
    const contextC = useContext(ContextP);

    const handleClick = async()=>{
        if(fav==picFavoritEmpty){
            setFav(picFavoriteFilled);
            contextC?.setFav(true);
            try{
                if(contextC?.userId!=null && contextC?.show){
                    const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
                    const ary = [...(res?.data?.fav || [])];
                    if(!ary.includes(clothesId)){
                        ary.push(clothesId);
                        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {fav: ary});
                    }                  
                }else{
                    alert("you must login...");
                    setFav(picFavoritEmpty);
                    contextC?.setFav(false);
                }
                
            }catch{
    
            }
        }else{
            setFav(picFavoritEmpty);
            try{
                if(contextC?.userId!=null && contextC?.show){
                    const res = await axios.get(`http://localhost:4000/users/${contextC?.userId}`);
                    const ary = [...(res?.data?.fav || [])];
                    if(ary.includes(clothesId)){
                        const ary2 =ary.filter(item => item!== clothesId);    
                        if(ary2.length==0){
                            contextC?.setFav(false);
                        }                 
                        await axios.patch(`http://localhost:4000/users/${contextC?.userId}`, {fav: ary2});
                    }                  
                }else{
                    alert("you must login...");
                    setFav(picFavoritEmpty);
                }
                
            }catch{
    
            }
        }
        
    }



    return (
        <>
        <div>
            <Image src={fav} alt="clothesImage" width={15} height={15} onClick={handleClick} className="mt-1"/>
        </div>
        </>
    );
}

export default FavoriteC;