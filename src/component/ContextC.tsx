'use client'
import {ReactNode, useState } from "react";

import React from "react";
type ContextType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    shopping: boolean;
    setShopping: React.Dispatch<React.SetStateAction<boolean>>;
    userId: string|null;
    setUserId: React.Dispatch<React.SetStateAction<string|null>>;
};
export const ContextP = React.createContext<ContextType | undefined>(undefined);
type chType = {children:ReactNode};
const ContextC = ({children}:chType) => {
    //state for login user or not
    const [show, setShow] = useState<boolean>(false);
    //state for select clothe for buy or not
    const [shopping, setShopping] = useState<boolean>(false);
    //state for favorite of clothes
    const [userId, setUserId] = useState<string| null>(null);
    return (
        <ContextP.Provider value={{show, setShow, shopping, setShopping, userId, setUserId}}>
            {children}
        </ContextP.Provider>
    );
}

export default ContextC;