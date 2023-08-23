import React, { useState } from "react";
import styles from "./crearcuenta.module.css";
import { useUsuarioContext } from "@/context/UsuarioContext";
import useValidacion from "../../hooks/useValidacion";
import validarCrearCuenta from "../../validacion/validarCrearCuenta";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import logo2 from "../../public/images/BookScapeLogo.png";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  passwordRepetida: "",
};

const Crearcuenta = () => {
  const router = useRouter();
  const [error, guardarError] = useState<string | null>(null);

  const {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur,
  } = useValidacion({
    stateInicial: STATE_INICIAL,
    validar: validarCrearCuenta,
    fn: crearCuenta,
  });

  const { nombre, email, password, passwordRepetida } = valores;

  async function crearCuenta() {
    try {
      const nuevoUsuario = {
        username: nombre,
        email: email,
        password: password,
      };

      await axios.post("http://localhost:3001/users", nuevoUsuario);

      router.push("/login");
    } catch (error: any) {
      console.error("Hubo un error al crear el usuario", error);
      guardarError("Hubo un error al crear el usuario");
    }
  }
  return (
    <div className={styles.container}>
          <img className={styles.logo2} src={logo2.src} alt="" />
         <h1>Crear Cuenta</h1>
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
          <label htmlFor="email">Correo electrónico</label>
          <input 
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            className={styles.input}
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.email && <p className={styles.alert}>{errores.email}</p>}
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
        <div>
          <label htmlFor="passwordRepetida">
            Vuelve a escribir la contraseña
          </label>
          <input 
            type="password"
            id="passwordRepetida"
            placeholder="Repetir la contraseña"
            name="passwordRepetida"
            className={styles.input}
            value={passwordRepetida}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errores.passwordRepetida && <p className={styles.alert}>{errores.passwordRepetida}</p>}
        {error && <p>{error} </p>}

        <button className={styles.button} type="submit" >Crear Cuenta</button>
      </form>
      <div>
        <p>
          Al crear una cuenta, aceptas las Condiciones de Uso y el Aviso de
          Privacidad de BookScape.
        </p>
      </div>
      <div>
        <p>¿Ya tienes una cuenta? <Link href="/login">Iniciar Sesión</Link></p>
      </div>
    </div>
  );
};

export default Crearcuenta;
