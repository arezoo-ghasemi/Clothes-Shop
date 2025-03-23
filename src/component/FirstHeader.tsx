'use client'
import Image from "next/image";
import picLogo from "../pic/logo.jpg";
import picSearch from "../pic/search.svg";
import picShopping from "../pic/shop.png"
import { useContext } from "react";
import { ContextP } from "./ContextC";

const FirstHeader = () => {

    const stateContext = useContext(ContextP);

    return (
        <div className="w-full flex  ">
            <Image src={picLogo} alt="logo" width={150} height={150} className="ml-3"/>
            <div className="w-1/2 flex justify-center items-center ml-36 relative ">
                <input type="text" className="w-full h-1/3  bg-blue-100 hover:border-1 focus:border-1 focus:border-blue-700 "  placeholder=" Search products and brands..."/>
                <button className="bg-blue-100 absolute right-3"><Image src={picSearch} alt="search"  /></button>
            </div>
            <div className="flex justify-center items-center ml-28 gap-1">
                <Image src={picShopping} alt="shopping" />
                {
                !stateContext?.show? <button className=" px-3 py-1 bg-blue-950 text-gray-100">Login/Register</button>: <button>Logout</button>
                }
            </div>
        </div>
    );
}

export default FirstHeader;