import ClothesData from "@/component/ClothesData";


const getData = async ()=>{
  const res = await fetch('http://localhost:4000/products')
  .then(res=>res.json());
  return res;

}

export default async function Home() {
  const clothesD = await getData();
  
  return (
    <>
      <ClothesData data={clothesD} />
    </>
  );
}
