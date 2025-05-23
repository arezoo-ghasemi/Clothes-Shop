'use client'
import Image from "next/image";
import picINF from "../pic/ImageNotFound.webp";
import FavoriteC from "./FavoriteC";
import { useRouter } from "next/navigation";


type productType = {product: {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}}}
const ClothesCard = ({product}:productType) => {
    const router = useRouter();

    const handleclik = ()=>{
        router.push(`/${product?.id}`);
    }


    return (
        <div className="flex flex-col justify-center items-center mt-7 hover:border-1 hover:border-gray-300 hover:cursor-pointer">
            <div onClick={handleclik}>
                {product?.image?<Image src={product?.image} alt="clothesImage" width={150} height={150} />:<Image src={picINF} alt="clothesImage" />}
            </div>
            <div>{product?.title}</div>
            <div className="flex justify-between gap-3 ">
                <p>{`Price: ${product?.price}`}</p>
                <FavoriteC clothesId={product?.id} />
            </div>
        </div>
    );
}

export default ClothesCard;