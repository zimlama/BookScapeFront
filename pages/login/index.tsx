import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import logo2 from "../../public/images/BookScapeLogo.png";

// validaciones
import useValidacion from "../../hooks/useValidacion";
import validarIniciarSesion from "../../validacion/validarIniciarSesion";
import axios from "axios";

const STATE_INICIAL = {
  nombre: "",
  password: "",
};

const login = () => {
  const router = useRouter();

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
      const response = await axios.post("http://localhost:3001/users/login", nuevoUsuario);

      console.log(response.data);
      if (response.data.message === "Login succesfully!") {
        router.push("/");

      }

      if(response.data === "User not found"){
        guardarError("Usuario no encontrado")
      }
      
      if(response.data === "Password does not match!"){
        guardarError("Contraseña incorrecta")
      }

    } catch (error: any) {
      console.error("Hubo un error al iniciar sesión ", error.response);
      guardarError(
        "No pudimos encontrar una cuenta con ese Usuario o dirección de correo electrónico, o con esa contraseña, te invitamos a crear una cuenta"
      ); // Mostrar mensaje de error en el frontend
    }
  }

  return (
    <div className={styles.container}>
      <img className={styles.logo2} src={logo2.src} alt="" />
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="nombre">Tu nombre</label>
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
          <label htmlFor="password">Contraseña</label>
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
        {errores.password && <p className={styles.alert}>{errores.password}</p>}

        {error && <p className={styles.alert}>{error} </p>}

        <button className={styles.button} type="submit">
          Iniciar sesión
        </button>
      </form>
      <div>¿Eres nuevo en BookScape?</div>
      <div>
        <Link href="/crearCuenta">Crea tu cuenta de BookScape</Link>
      </div>
    </div>
  );
};

export default login;
