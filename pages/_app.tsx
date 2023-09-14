// _app.tsx es un componente especial que se utiliza para personalizar y envolver la aplicación con componentes o lógica global antes de que se rendericen las páginas individuales. Es un componente de nivel superior que se utiliza para realizar configuraciones generales, manejar estado global, aplicar estilos globales y realizar otras acciones comunes en toda la aplicación.

import { AppProps } from "next/app"
import React from "react";
// import '../styles/globals.css'; // podemos utilizar estilos globales
import Layout from "@/components/Layout/Layout";
import { BookProvider } from "@/context/BookContext";
import { UsuarioProvider } from "@/context/UsuarioCrudContext";
import { useEffect } from "react";
import axios from "axios";
import { CartProvider } from "@/context/CartContext";
import { CartBdProvider } from "@/context/CartBdContext";
import { FilterProvider } from "@/context/FilterContext";
import { AuthProvider } from "@/context/AuthContext";
import { CrudBookProvider } from "@/context/CrudBookContext"
import { PayPalScriptProvider} from "@paypal/react-paypal-js";

const clientId = process.env.PAY_PAL_CLIENT_ID; // Obtiene el id del cliente base del archivo .env.local PAY_PAL_CLIENT_ID

/**
 * Componente raíz de la aplicación.
 * Envuelve cada página con el componente Layout para proporcionar una estructura común.
 * @param Component - Componente de la página actual.
 * @param pageProps - Propiedades pasadas a la página.
 */
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Configura el token en el encabezado de las solicitudes Axios
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <PayPalScriptProvider
              options={{
                "clientId" : "AVeUZj-pC_d5L7jKC33MY4O7H-hMrQrgtHNvTIptzH6-B_Ui0vmC4y-oPo4_EpJaJxXME2L28N2q0EG-"//`${clientId}`
              }}
    >
      <BookProvider>
      <CrudBookProvider>
      <UsuarioProvider>
        <AuthProvider>
        <CartProvider>
          <CartBdProvider>
            <FilterProvider>
              <Layout>
                {/* El componente Layout envuelve cada página */}
                <Component {...pageProps} />
              </Layout>
             </FilterProvider>
          </CartBdProvider>
          </CartProvider>
        </AuthProvider>
      </UsuarioProvider>
      </CrudBookProvider>
    </BookProvider>
    </PayPalScriptProvider>
  );
}

export default MyApp;
