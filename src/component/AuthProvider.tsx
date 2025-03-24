'use client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactNode } from 'react';



type childrenType = {children:ReactNode}
const AuthProvider = ({children}:childrenType) => {
    const clientIdS = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if(clientIdS==null){
        return null;
    }
    return (
        <GoogleOAuthProvider clientId={clientIdS}>{children}</GoogleOAuthProvider>

    );
}

export default AuthProvider;