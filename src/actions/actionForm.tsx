'use server'

import axios from "axios";
import { cookies } from "next/headers";

// type elmType = {id:number, username: string, password: string, Credential:string};
export async function actionForm(state:{success:boolean, message: string}|undefined, formData:FormData){
    const username = formData.get("username");
    const password = formData.get("password");
    if(username==null|| username=="" ){
        return {success:false, message:"Username is empty"};
    }
    if(password==null|| password=="" ){
        return {success:false, message:"Password is empty"};
    }

    try{
        const res = await axios.get("http://localhost:4000/users");
        if(res.status == 200){
            for(const element of res?.data){
                if(element?.username==username){
                    if(element?.password==password){
                        (await cookies()).set("TokenUser", "UserLogin");                        
                        return {success:true, message:element?.id};
                    }else{
                        return {success:false, message:"password is incorrect"};
                    }
                }
            };
        }          
        return {success:false, message:"The account is not exist"};

    }catch{
        return {success:false, message:"The connection is faild..."};
    }

}