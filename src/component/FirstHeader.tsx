'use client'
import Image from "next/image";
import picLogo from "../pic/logo.jpg";
import picSearch from "../pic/search.svg";
import picShopping from "../pic/shop.png"
import { useContext, useState } from "react";
import { ContextP } from "./ContextC";
import ModalLogin from "./ModalLogin";
import Cookies from "universal-cookie";

const FirstHeader = () => {

    const stateContext = useContext(ContextP);
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleLogin = ()=>{
        setShowModal(true);

    }

    const handleLogout = ()=>{
        const cS = new Cookies(null,{ path:"/" });    
        cS.remove("TokenUser");
        stateContext?.setShow(false);
    }

    const handelClose = ()=>{
        setShowModal(false);
    }

    return (
        <>
        <div className="relative z-0 w-full h-screen">
            <div className="w-full flex ">
                <Image src={picLogo} alt="logo" width={150} height={150} className="ml-3"/>
                <div className="w-1/2 lg:flex justify-center items-center ml-36 hidden  relative ">
                    <input type="text" className="w-full h-1/3  bg-blue-100 hover:border-1 focus:border-1 focus:border-blue-700 "  placeholder=" Search products and brands..."/>
                    <button className="bg-blue-100 absolute right-3 hover:cursor-pointer"><Image src={picSearch} alt="search" /></button>
                </div>
                <div className="flex justify-center items-center lg:ml-28 mr-7 gap-1">
                    <Image src={picShopping} alt="shopping" className="hover:cursor-pointer"/>
                    {
                    !stateContext?.show? <button onClick={handleLogin} className=" px-3 py-1 bg-blue-900 text-gray-100 hover:bg-blue-950 hover:cursor-pointer">Login/Register</button>: <button onClick={handleLogout} className=" px-3 py-1 bg-blue-900 text-gray-100 hover:bg-blue-950 hover:cursor-pointer">Logout</button>
                    }
                </div>
            </div>
            <div className=" lg:hidden flex justify-center items-center  relative ">
                <input type="text" className="w-2/3 h-9 bg-blue-100 hover:border-1 focus:border-1 focus:border-blue-700 "  placeholder=" Search products and brands..."/>
                <button className="bg-blue-100 absolute  right-1/6 hover:cursor-pointer"><Image src={picSearch} alt="search" /></button>
            </div>
            {showModal? <ModalLogin handleclik={handelClose} />:""}
        </div>
        </>
    );
}

export default FirstHeader;