
import Image from "next/image";
import picINF from "../pic/ImageNotFound.webp";
import FavoriteC from "./FavoriteC";


type productType = {product: {id?:number, title?: string, price?:number, description?:string, category?: string, image?:string, rating: {rate?:number, count?:number}}}
const ClothesCard = ({product}:productType) => {
    return (
        <div className="flex flex-col justify-center items-center mt-7 hover:border-1 hover:border-gray-300 hover:cursor-pointer">
            <div>
                {product?.image?<Image src={product?.image} alt="clothesImage" width={150} height={150} />:<Image src={picINF} alt="clothesImage" />}
            </div>
            <div className="flex justify-between gap-3 ">
                <p>{`Price: ${product?.price}`}</p>
                <FavoriteC clothesId={product?.id} />
            </div>
        </div>
    );
}

export default ClothesCard;