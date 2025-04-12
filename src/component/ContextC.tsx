'use client'
import {ReactNode, useState } from "react";

import React from "react";
type productType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
type ContextType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    shopping: boolean;
    setShopping: React.Dispatch<React.SetStateAction<boolean>>;
    fav: boolean;
    setFav: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string|null;
    setUserId: React.Dispatch<React.SetStateAction<string|null>>;
    clothesL: productType[]|null;
    setClothesL: React.Dispatch<React.SetStateAction<productType[]|null>>;
};
export const ContextP = React.createContext<ContextType | undefined>(undefined);
type chType = {children:ReactNode};
const ContextC = ({children}:chType) => {
    //state for login user or not
    const [show, setShow] = useState<boolean>(false);
    //state for select clothe for buy or not
    const [shopping, setShopping] = useState<boolean>(false);
    //state for favorite of clothes
    const [fav,setFav] = useState<boolean>(false);
    //state for save userId
    const [userId, setUserId] = useState<string| null>(null);
    //state for List of clothes
    const [clothesL, setClothesL] = useState<productType[]|null>(null);
    return (
        <ContextP.Provider value={{show, setShow, shopping, setShopping, fav, setFav, userId, setUserId, clothesL, setClothesL}}>
            {children}
        </ContextP.Provider>
    );
}

export default ContextC;