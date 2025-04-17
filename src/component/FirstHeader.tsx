'use client'
import Image from "next/image";
import picLogo from "../pic/logo.png";
import picSearch from "../pic/search.svg";
import picShoppingEmpty from "../pic/shopping-bag-empty.svg";
import picShoppingFilled from "../pic/shopping-bag-full.svg";
import picFavoritEmpty from "../pic/favorite-empty.svg";
import picFavoriteFilled from "../pic/favorite-filled.svg";
import { useContext, useRef, useState } from "react";
import { ContextP } from "./ContextC";
import ModalLogin from "./ModalLogin";
import Cookies from "universal-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";

type productType = {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}};
const FirstHeader = () => {

    const stateContext = useContext(ContextP);
    const [showModal, setShowModal] = useState<boolean>(false);
    const refSearch = useRef<HTMLInputElement |null>(null);
    const router = useRouter();

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

    const handleChange = async()=>{
        const searchText = refSearch?.current?.value;
        if(searchText=="" || searchText==null){
            stateContext?.setClothesL(null);
        }else{
            const res = await axios.get("http://localhost:4000/products");            
            const ary = res.data.map((item:productType)=>{
                if(item?.title?.startsWith(searchText) || item?.title?.toLowerCase().startsWith(searchText)){
                    return item;                   
                }});            
            stateContext?.setClothesL(ary);
        }
    }

    const handelShoppingClick = ()=>{
        router.push(`http://localhost:3000/buy`);       
    }

    const handleEmptyShopping = ()=>{
        alert("Basket is Empty...");
    }

    const handleFaveEmpty = ()=>{
        if(!stateContext?.show){
            alert("you must login...");
        }else{
            alert("You dont like any produnct...");
        }
    }

    const handleFaveFill = ()=>{
        router.push("http://localhost:3000/favlist");
    }

    return (
        <>
        <div className="relative z-0 w-full ">
            <div className="w-full flex justify-between ">
                <Image src={picLogo} alt="logo" width={100} height={100} className="ml-7 mt-3 "/>
                <div className="w-1/2 lg:flex justify-center items-center ml-36 hidden  relative ">
                    <input type="text" ref={refSearch} onChange={handleChange} className="w-full h-1/2  bg-blue-100 hover:border-1 focus:border-1 focus:border-blue-700 "  placeholder=" Search products and brands..."/>
                    <button className="bg-blue-100 absolute right-3 hover:cursor-pointer"><Image src={picSearch} alt="search" /></button>
                </div>
                <div className="flex justify-center items-center lg:ml-28 mr-7 gap-1">
                    {!stateContext?.shopping? <Image  src={picShoppingEmpty} alt="shopping" width={40} height={40} onClick={handleEmptyShopping} className="hover:cursor-pointer"/>: <Image  src={picShoppingFilled} alt="shopping" width={40} height={40} onClick={handelShoppingClick}  className="hover:cursor-pointer"/>}                   
                    {!stateContext?.fav?  <Image src={picFavoritEmpty} alt="favorite" width={40} height={40} onClick={handleFaveEmpty} className="hover:cursor-pointer"/>: <Image src={picFavoriteFilled} alt="favorite" width={40} height={40} onClick={handleFaveFill} className="hover:cursor-pointer"/>}
                    {
                    !stateContext?.show? <button onClick={handleLogin} className=" px-3 py-1 bg-blue-900 text-gray-100 hover:bg-blue-950 hover:cursor-pointer">Login/Register</button>: <button onClick={handleLogout} className=" px-3 py-1 bg-blue-900 text-gray-100 hover:bg-blue-950 hover:cursor-pointer">Logout</button>
                    }
                </div>
            </div>
            <div className=" lg:hidden mb-3 mt-3 flex justify-center items-center  relative ">
                <input type="text" className="w-2/3 h-9 bg-blue-100 hover:border-1 focus:border-1 focus:border-blue-700 "  placeholder=" Search products and brands..."/>
                <button className="bg-blue-100 absolute  right-1/6 hover:cursor-pointer"><Image src={picSearch} alt="search" /></button>
            </div>
            {showModal? <ModalLogin handleclik={handelClose} />:""}
        </div>
        </>
    );
}

export default FirstHeader;