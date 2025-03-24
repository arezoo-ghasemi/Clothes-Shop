import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { ContextP } from "./ContextC";

type handleType = {handel: ()=>void}
const AuthButton = ({handel}:handleType) => {
    const contextChange = useContext(ContextP);

    const successLogin =  (credentialResponse :CredentialResponse)=>{
        const cS = new Cookies(null,{ path:"/" });    
        cS.set("TokenUser", credentialResponse?.credential);
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