import React from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';

export default function LoginGoogle() {

    function handleError() {
        console.log("Falla del login Google");        
    }

    function handleSuccess(credentialResponse: CredentialResponse) {
        console.log("credentialResponse", credentialResponse);
    }

    return ( 
        <div>
            <GoogleLogin onError={handleError} onSuccess={handleSuccess} />
        </div>
    )
}