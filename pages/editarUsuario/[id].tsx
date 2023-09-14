import React, { useState, useEffect } from "react";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import { useRouter } from "next/router";
import styles from "./edtitarUsuario.module.css";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";
import { useAuthContext } from "@/context/AuthContext";

interface Usuario {
  id: string;
  username: string;
  email: string;
  newPassword: string;
}

interface Errors {
  username?: string;
  email?: string;
  newPassword?: string;
}

type Editado = {
  message: string | undefined;
  id: string | undefined;
  email: string;
  username: string;
  admin: boolean | undefined;
  token: string | undefined;
  shoppingcartId: {
      cart_id: number;
  } | undefined;
}

const EditarUsuario = () => {
  const router = useRouter();

  const { editarUsuario, editUsuarios, setEditarUsuario } = useUsuarioContext();
  const { user, isAuthenticated, setUser } = useAuthContext();

  // Nuevo state de libros
  const [editUsuario, setEditUsuario] = useState<Usuario>({
    id: "",
    username: "",
    email: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  // Llenar el state automáticamente
  useEffect(() => {
    if (editarUsuario) {
      setEditUsuario(editarUsuario);
    }
  }, [editarUsuario]);

  const validateForm = () => {
    const newErrors: Errors = {};

    if (editUsuario.username.trim() === "") {
      newErrors.username = "El nombre de usuario es obligatorio";
    }

    if (editUsuario.email.trim() === "") {
      newErrors.email = "El correo electrónico es obligatorio";
    }


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };


  // Actualizar un campo específico del formulario
  const onChangeFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditUsuario({
      ...editUsuario,
      [name]: value,
    });
  };

  const submitEditarUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los cambios o realizar cualquier otra lógica
    if (validateForm()) {
      editUsuarios(editUsuario);
  
      const editado: Editado = {
        message: user?.message,
        id: user?.id,
        email: editUsuario.email,
        username: editUsuario.username,
        admin: user?.admin,
        token: user?.token,
        shoppingcartId: user?.shoppingcartId,
      }
      setUser(editado)
      localStorage.setItem("authUser", JSON.stringify(editado));
      router.push("/admin");
    }
  };

  return (
    <div className={styles.contenedor}>
       <div  className={styles.liner}><div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>       
      </div>
       <h2>Editar Usuario</h2>
      <div className={styles.container}>
      <form onSubmit={submitEditarUsuario}>
        <div>
          <label>Usuario</label>
          <input
          className={styles.input}
            type="text"
            placeholder="Usuario"
            name="username"
            value={editUsuario.username}
            onChange={onChangeFormulario}
          />
          {errors.username && <p className={styles.error}>{errors.username}</p>}
        </div>
        <div>
          <label>Nueva Contraseña</label>
          <input
          className={styles.input}
            type="text"
            placeholder="Nueva contraseña"
            name="newPassword"
            value={editUsuario.newPassword}
            onChange={onChangeFormulario}
          />
          
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
          className={styles.input}
            type="text"
            placeholder="email"
            name="email"
            value={editUsuario.email}
            onChange={onChangeFormulario}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        {/* agregar mas campos */}
        <button className={styles.button} type="submit">Guardar Cambios</button>
      </form>      
      <div >
        <br />
        <Link href='/admin' className={styles.button3} >Regresar Menu principal</Link>
        <br /><br />
         Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
    </div>
    </div>
  );
};

export default EditarUsuario;
