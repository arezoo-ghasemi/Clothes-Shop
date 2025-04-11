import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { ContextP } from "./ContextC";
import axios from "axios";

type handleType = {handel: ()=>void}
type elmType = {id?:number, credential?:string};
const AuthButton = ({handel}:handleType) => {
    const contextChange = useContext(ContextP);

    const successLogin = async (credentialResponse :CredentialResponse)=>{
        const cS = new Cookies(null,{ path:"/" });    
        cS.set("TokenUser", credentialResponse?.credential);
        try{
            await axios.get("http://localhost:4000/users").then((res)=>{
                let t = false;
                res.data.map((elm:elmType)=>{
                    if(elm.credential==credentialResponse?.credential){
                        t=true;
                    }
                })
                if(!t){
                    axios.post("http://localhost:4000/users", {id:res.data.length, cresential:credentialResponse?.credential}).then((resD)=> console.log(resD));
                    contextChange?.setUserId(res.data.length);
                }               
            });
        }catch{
            console.log("connect faild");
            
        }
        contextChange?.setShow(true);
        handel();
        
    }

    const catchLogin =()=>{
        console.log("Login faild");
        
    }

    return (
        <GoogleLogin  onSuccess={successLogin} onError={catchLogin} />
    );
}

export default AuthButton;