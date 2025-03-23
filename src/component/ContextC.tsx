'use client'
import {ReactNode, useState } from "react";

import React from "react";
type ContextType = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ContextP = React.createContext<ContextType | undefined>(undefined);
type chType = {children:ReactNode};
const ContextC = ({children}:chType) => {
    const [show, setShow] = useState<boolean>(false);
    return (
        <ContextP.Provider value={{show, setShow}}>
            {children}
        </ContextP.Provider>
    );
}

export default ContextC;