'use client'

import Image from "next/image";
import picNike from "../pic/brands/brand-nike.svg";
import picDior from "../pic/brands/Christian_Dior.svg";
import picGucci from "../pic/brands/Gucci-Logo.wine.svg";
import picLouis from "../pic/brands/Louis_Vuitton-Logo.wine.svg";
import picPuma from "../pic/brands/Puma_logo.svg";
import picArmor from "../pic/brands/Under_Armour-Logo.wine.svg";
import picVersace from "../pic/brands/versace-medusa-2-logo.svg";
import picZara from "../pic/brands/zara-logo.svg";

const BrandsSlide = () => {
    const ary = [picNike, picDior, picGucci, picLouis, picPuma, picArmor, picVersace, picZara];

    return (
        <div className="w-full mt-3 border-y-1 justify-center items-center p-1 ">
            <ul className="flex gap-10">
                {ary.map((elm, index)=>{
                    return (<li key={index}><Image src={elm} alt="brandLogo" width={50} height={50}/></li>)
                })}
                {ary.map((elm, index)=>{
                    return (<li key={(index+ary.length)}><Image src={elm} alt="brandLogo" width={50} height={50}/></li>)
                })}
            </ul>
        </div>
    );
}

export default BrandsSlide;