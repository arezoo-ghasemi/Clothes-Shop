'use client'

import Link from "next/link";

type itemType = {item: {ti:string, adr:string}}
const MenuItem = ({item}:itemType) => {
    return (
        <li>
            <Link href={item.adr} >{item.ti}</Link>
        </li>
    );
}

export default MenuItem;