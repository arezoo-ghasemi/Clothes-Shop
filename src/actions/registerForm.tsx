'use server'

import axios from "axios";
import { cookies } from "next/headers";
type elmType = {id:number, username:string, password: string};
export async function registerForm(Rstate:{Rsuccess:boolean, Rmessage: string}|undefined, formData:FormData){
    const username = formData.get("username");
    const password = formData.get("password");
    const Repassword = formData.get("Repassword");

    if(username==null || username==""){
        return {Rsuccess:false, Rmessage:"username is empty"}
    }
    if(password==null || password==""){
        return {Rsuccess:false, Rmessage:"password is empty"}
    }
    if(Repassword==null || Repassword==""){
        return {Rsuccess:false, Rmessage:"repassword is empty"}
    }
    if(password != Repassword){
        return {Rsuccess:false, Rmessage:"Repassword is not equal password"}
    }

    try{
        let lengthU=0;
        await axios.get("http://localhost:4000/users").then((res)=>{
            lengthU=res.data.length;
            res.data.map((elm:elmType)=>{
                if(elm.username==username){
                    return {Rsuccess:false, Rmessage:"This username exist"}
                }
            })
        })
        await axios.post("http://localhost:4000/users", {id: lengthU, username:username, password:password}).then(async (res)=>{          
            if(res.status==200 || res.status==201){                
                (await cookies()).set("TokenUser", "UserLogin");                
                return {Rsuccess:true, Rmessage:"Your accont create"};
            }
        })

        return {Rsuccess:false, Rmessage:"The unknown error occured"};

    }catch{
        return {Rsuccess:false, Rmessage:"The unknown error is occured"};
    }
}