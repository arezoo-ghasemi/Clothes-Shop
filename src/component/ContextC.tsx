'use client'
import {ReactNode, useState } from "react";

import React from "react";
type ContextType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    shopping: boolean;
    setShopping: React.Dispatch<React.SetStateAction<boolean>>;
    fav: boolean;
    setFav: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ContextP = React.createContext<ContextType | undefined>(undefined);
type chType = {children:ReactNode};
const ContextC = ({children}:chType) => {
    //state for login user or not
    const [show, setShow] = useState<boolean>(false);
    //state for select clothe for buy or not
    const [shopping, setShopping] = useState<boolean>(false);
    //state for favorite of clothes
    const [fav, setFav] = useState<boolean>(false);
    return (
        <ContextP.Provider value={{show, setShow, shopping, setShopping, fav, setFav}}>
            {children}
        </ContextP.Provider>
    );
}

export default ContextC;