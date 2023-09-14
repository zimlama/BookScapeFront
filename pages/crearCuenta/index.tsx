import React, { useState } from "react";
import styles from "./crearcuenta.module.css";
import useValidacion from "../../hooks/useValidacion";
import validarCrearCuenta from "../../validacion/validarCrearCuenta";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import logo2 from "../../public/images/BookScapeLogo.png";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local
const usersUrl = `${bookscapeback}/users`; // Construye la URL completa

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
  passwordRepetida: "",
};

const Crearcuenta = () => {
  const router = useRouter();
  const [error, guardarError] = useState<string | null>(null);

  const { valores, errores, handleSubmit, handleChange, handleBlur } =
    useValidacion({
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

      await axios.post(usersUrl, nuevoUsuario);
      try {
        const signupResponse = await axios.put(
          `${bookscapeback}/mail/signup`,
          {
            email: nuevoUsuario.email, 
          }
        );
        // Aquí puedes manejar la respuesta de la solicitud de registro
        console.log("Respuesta de registro:", signupResponse.data);
        
        // Finalmente, redirige al usuario a la página principal u otra página según tus necesidades
        router.push("/");
      } catch (signupError) {
        console.error("Error al enviar el correo:", signupError);
      }
      router.push("/login");
    } catch (error: any) {
      console.error("Hubo un error al crear el usuario", error);
      guardarError("Hubo un error al crear el usuario");
    }
  }
  return (
    <>
      <div className={styles.logo1}>
        <Link href="/">
          <img className={styles.logo2} src={logo2.src} alt="" />
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Crear Cuenta</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="nombre" style={{ fontWeight: "bold" }}>
              Tu Usuario
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Usuario..."
              name="nombre"
              className={styles.input}
              value={nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errores.nombre && <p className={styles.alert}>{errores.nombre}</p>}
          <div>
            <label htmlFor="email" style={{ fontWeight: "bold" }}>
              Correo electrónico
            </label>
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
          <div>
            <label htmlFor="passwordRepetida" style={{ fontWeight: "bold" }}>
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
          {errores.passwordRepetida && (
            <p className={styles.alert}>{errores.passwordRepetida}</p>
          )}
          {error && <p>{error} </p>}

          <button className={styles.button} type="submit">
            Crear Cuenta
          </button>
        </form>
        <div>
          <p>
            Al crear una cuenta, aceptas las Condiciones de Uso y el Aviso de
            Privacidad de BookScape.
          </p>
        </div>
        <div>
          <p>
            ¿Ya tienes una cuenta? <Link href="/login">Iniciar Sesión</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Crearcuenta;
