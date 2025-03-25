'use client'

import MenuItem from "./MenuItem";

type aryType = {ti:string, adr:string};
const Menu = () => {
    const ary: aryType[] = [{ti: "Home", adr:"/"}, {ti: "Women", adr:"/women"}, {ti: "Men", adr:"/men"}, {ti: "Kids", adr:"/kids"}, {ti: "Sport", adr:"/sport"}, {ti: "Brands", adr:"/brands"}]

    return (
        <div>
            <ul className="flex lg:gap-7 gap-2 ml-10 mt-3 font-bold lg:text-lg">
                {ary.map((elm:aryType, index:number)=>{
                    return <MenuItem key={index} item={elm}/>
                })}
            </ul>
            
        </div>
    );
}

export default Menu;