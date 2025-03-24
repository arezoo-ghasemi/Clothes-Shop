'use client'

import AuthButton from "./AuthButton";
import picClose from "../pic/icons8-close.svg";
import Image from "next/image";
import { useContext, useRef, useState } from "react";
import { ContextP } from "./ContextC";
import Cookies from "universal-cookie";

type handleType = {handleclik: ()=>void};
function ModalLogin({ handleclik }:handleType) {
    const contextC = useContext(ContextP);
    const [message, setMessage] = useState<string | null>(null);
    const refUser = useRef<HTMLInputElement>(null);
    const refPass = useRef<HTMLInputElement>(null);

    const handleForm = () => {
        if(refUser?.current?.value =="" || refPass?.current?.value == ""){
            setMessage("User or password input is empty...");
        }else{
            const cS = new Cookies(null,{ path:"/" });    
            cS.set("TokenUser", "ArezooLogin37137132");
            contextC?.setShow(true);
            handleclik();
        }
    };


    return (
        <div className="absolute z-10 top-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="w-full h-fit bg-white  lg:w-1/3 gap-3  flex flex-col justify-center items-center border-1 shadow-2xl border-gray-700">
                <div className="w-full flex justify-end mr-7">
                    <Image src={picClose} alt="close" width={50} height={50} onClick={handleclik} className="hover:cursor-pointer" />
                </div>
                <form action={handleForm} className="w-full p-3 flex flex-col  gap-2">
                    <p className="text-center">{message? message:""}</p>
                    <input ref={refUser} type="text" placeholder=" Enter your username" name="username" className="w-full border-1 hover:border-blue-400 focus:border-1 focus:border-blue-700  " />
                    <input ref={refPass} type="password" placeholder=" Enter your password" name="password" className="w-full border-1 hover:border-blue-400 focus:border-blue-700 " />
                    <div className="felx flex-row gap-3 ">
                        <input type="checkbox" name="save" id="save" />
                        <label htmlFor="save">Remember</label>
                    </div>
                    <button className="w-full bg-blue-950 text-gray-100 py-1" type="submit">Login</button>
                    <div className="flex items-center justify-center mb-7">
                        <AuthButton handel={handleclik}/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalLogin;