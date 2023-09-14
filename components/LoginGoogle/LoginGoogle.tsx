import React, { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import decodeJwt from "./decodeJwt";
import axios from "axios";
import { useRouter } from "next/router"; // Importa useRouter de Next.js

//Prueba//
import { useAuthContext } from "@/context/AuthContext";
//Prueba//
type UserLogin = {
  message: string;
  id: string;
  email: string;
  username: string;
  token: string;
  admin: boolean;
  shoppingcartId: {
    cart_id: number;
  };
};

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local

export default function LoginGoogle() {
  const [nombre, setNombre] = useState<string | null>(null);
  const router = useRouter(); // Obtiene la instancia de router de Next.js

  //Prueba//
  const { setUser, user, login } = useAuthContext();
  //Prueba//

  function handleError() {
    console.log("Falla del login Google");
  }

  async function handleSuccess(credentialResponse: CredentialResponse) {
    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential);

      setNombre(payload.email);
      try {
        const response = await axios.post(
          `${bookscapeback}/users/googleloggin`,
          payload
        );
       
        if (response.data.message === "Login succesfully!") {
          //PRUEBA//
          const userLogin: UserLogin = {
            message: response.data.message,
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
            token: response.data.token,
            admin: response.data.admin,
            shoppingcartId: {
              cart_id: response.data.cartId,
            },
          };

          login(userLogin.token, userLogin);
          
          router.push("/");
        } else {
          console.log("La respuesta del servidor no fue aprobada");
        }
      } catch (error) {
        console.error("Error al comunicarse con el servidor:", error);
      }
    }
  }

  return (
    <div>
      {nombre === null && (
        <GoogleLogin
          useOneTap
          onError={handleError}
          onSuccess={handleSuccess}
        />
      )}
      {nombre && <p>El usuario se ha iniciado sesion: {nombre}</p>}
    </div>
  );
}
