import ButtonBuyAndBack from "@/component/ButtonBuyAndBack";
import axios from "axios";
import Image from "next/image";

const getData = async(proId:string)=>{
    const res = await axios.get(`http://localhost:4000/products/${proId}`);
    return res.data;
}


type paramsType = {params: Promise<{productDetail:string}>};
const page = async({params}:paramsType) => {
    
    const proId = (await params)?.productDetail;
    const detailD = await getData(proId);


    return (
        <div className="flex flex-col lg:flex-row mt-7 gap-7">
            <Image src={detailD.image} alt="product image" width={200} height={200} className=" ml-7 lg:ml-32"/>
            <div className="flex flex-col gap-7 lg:w-1/2 ml-7 mr-7 ">
                <h1 className="font-bold text-xl">{detailD?.title}</h1>
                <p>{detailD?.description}</p>
                <p className="font-bold">{`Price: ${detailD?.price}`}</p>
                <ButtonBuyAndBack productId={detailD?.id}/>
            </div>
        </div>
    );
}

export default page;