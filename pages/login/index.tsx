import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import logo2 from '../../public/images/BookScapeLogo.png';
import LoginGoogle from "../../components/LoginGoogle/LoginGoogle"

//Login de Google
 import { GoogleOAuthProvider } from '@react-oauth/google';

// validaciones
import useValidacion from "../../hooks/useValidacion";
import validarIniciarSesion from "../../validacion/validarIniciarSesion";
import axios from "axios";

import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local
const loginUrl = `${bookscapeback}/users/login`; // Construye la URL completa



const STATE_INICIAL = {
  nombre: "",
  password: "",
};

const Login = () => {
  const router = useRouter();

  // Usa el hook useAuthContext para obtener el contexto de autenticación
  const { login } = useAuthContext();

  const [error, guardarError] = useState("");

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion({
      stateInicial: STATE_INICIAL,
      validar: validarIniciarSesion,
      fn: IniciarSesion,
    });

  const { nombre, password } = valores;

  async function IniciarSesion() {
    try {
      const nuevoUsuario = {
        username: nombre,
        password: password,
      };
      const response = await axios.post(
        loginUrl,
        nuevoUsuario
      );

      if (response.data.message === "Login succesfully!") {
        if (response.data.email === "admin@bookscape.net") {
          login(response.data.token, response.data);
          router.push("/admin");
        }
        // Llama a la función login del contexto para establecer el usuario y el token
        // Verificar si hay una URL guardada en localStorage
        // const redirectAfterLogin = localStorage.getItem("redirectAfterLogin");
        // if (redirectAfterLogin) {
        // //   // Redirigir al usuario a la URL guardada
        //   router.push(redirectAfterLogin);
        //   localStorage.removeItem("redirectAfterLogin"); // Borra la URL guardada
        // } else {
          // Redirigir a una página predeterminada después del inicio de sesión
          login(response.data.token, response.data);
          router.push("/"); // Cambia esto por la URL que desees
        }

      if (response.data === "User not found") {
        guardarError("Usuario no encontrado");
      }

      if (response.data === "Password does not match!") {
        guardarError("Contraseña incorrecta");
      }
    } catch (error: any) {
      console.error("Hubo un error al iniciar sesión ", error.response);
      guardarError(
        "No pudimos encontrar una cuenta con ese Usuario o dirección de correo electrónico, o con esa contraseña, te invitamos a crear una cuenta"
      ); // Mostrar mensaje de error en el frontend
    }
  }
  return (
    <GoogleOAuthProvider clientId="332589329954-m07o8o9o6j0g091mrn8famijis79ook0.apps.googleusercontent.com">
    <>
      <div className={styles.logo1}>
      <Link href="/"><img className={styles.logo2} src={logo2.src} alt="" /></Link>
        
      </div>
      <div className={styles.container}>
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="nombre" style={{ fontWeight: "bold" }}>
              E-mail o Usuario
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Nombres y Apellidos"
              name="nombre"
              className={styles.input}
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errores.nombre && <p className={styles.alert}>{errores.nombre}</p>}
          <div>
            <label htmlFor="password" style={{ fontWeight: "bold" }}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              placeholder="Como mínimo 6 caracteres"
              name="password"
              className={styles.input}
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errores.password && (
            <p className={styles.alert}>{errores.password}</p>
          )}

          {error && <p className={styles.alert}>{error} </p>}

          <button className={styles.button} type="submit">
            Iniciar sesión
          </button>
          <LoginGoogle/> 
        </form>
        <div>¿Eres nuevo en BookScape?</div>
        <div>
          <Link href="/crearCuenta">Crea tu cuenta de BookScape</Link>
        </div>
      </div>
    </>
      </GoogleOAuthProvider>
  );
};

export default Login;
