'use client'

import AuthButton from "./AuthButton";
import picClose from "../pic/close.svg";
import Image from "next/image";
import { useActionState, useContext, useEffect, useState } from "react";
import { ContextP } from "./ContextC";
import { actionForm } from "@/actions/actionForm";
import { registerForm } from "@/actions/registerForm";

const initialState = {
    success: false,
    message:""
}

const RinitialState = {
    Rsuccess: false,
    Rmessage:""
}

type handleType = {handleclik: ()=>void};
function ModalLogin({ handleclik }:handleType) {
    const contextC = useContext(ContextP);
    const [register, setRegister] = useState<boolean>(false);
    const [state, formAction] = useActionState(actionForm,initialState );
    const [Rstate, registerF] = useActionState(registerForm, RinitialState);

    useEffect(()=>{
        if(state?.success || Rstate?.Rsuccess){
            contextC?.setShow(true);
            handleclik();
        }
    },[Rstate?.Rsuccess, contextC, handleclik, state?.success])

    const handleRegister = ()=>{
        setRegister(true);
    }

    const handleBack = ()=>{
        setRegister(false);
    }

    return (
        <div className="absolute z-10 top-0 w-full h-screen bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
            <div className="w-full h-fit bg-white  lg:w-1/3 gap-3  flex flex-col justify-center items-center border-1 shadow-2xl border-gray-700">
                <div className="w-full flex justify-end mr-7">
                    <Image src={picClose} alt="close" width={20} height={20} onClick={handleclik} className="hover:cursor-pointer mt-3" />
                </div>
                {!register?
                <form action={formAction} className="w-full p-3 flex flex-col  gap-2">
                    {state?.message && !state?.success? <p className="text-center font-bold">{state?.message}</p>:""}
                    <input  type="text" placeholder=" Enter your username" name="username" className="w-full border-1 hover:border-blue-400 focus:border-1 focus:border-blue-700  " />
                    <input  type="password" placeholder=" Enter your password" name="password" className="w-full border-1 hover:border-blue-400 focus:border-blue-700 " />
                    <div className="felx flex-row gap-3 ">
                        <input type="checkbox" name="save" id="save" />
                        <label htmlFor="save">Remember</label>
                    </div>
                    <button className="w-full bg-blue-950 text-gray-100 py-1" type="submit">Login</button>
                    <div className="flex items-center justify-center mb-7">
                        <AuthButton handel={handleclik}/>
                    </div>
                    <p className="text-center text-blue-500 hover:text-blue-600 hover:cursor-pointer" onClick={handleRegister}>Register now</p>
                </form>:
                <form action={registerF} className="w-full p-3 flex flex-col  gap-2">
                {Rstate?.Rmessage && !Rstate?.Rsuccess? <p className="text-center font-bold">{Rstate?.Rmessage}</p>:""}
                <input  type="text" placeholder=" Enter your username" name="username" className="w-full border-1 hover:border-blue-400 focus:border-1 focus:border-blue-700  " />
                <input  type="password" placeholder=" Enter your password" name="password" className="w-full border-1 hover:border-blue-400 focus:border-blue-700 " />
                <input  type="password" placeholder=" Enter your password again" name="Repassword" className="w-full border-1 hover:border-blue-400 focus:border-blue-700 " />
                <div className="felx flex-row gap-3 ">
                    <input type="checkbox" name="save" id="save" />
                    <label htmlFor="save">Remember</label>
                </div>
                <button className="w-full bg-blue-950 text-gray-100 py-1" type="submit">Register</button>
                <div className="flex items-center justify-center mb-7">
                    <AuthButton handel={handleclik}/>
                </div>
                <p className="text-center text-blue-500 hover:text-blue-600 hover:cursor-pointer" onClick={handleBack}>{"< Back"}</p>
            </form>
            }
            </div>
        </div>
    );
}

export default ModalLogin;