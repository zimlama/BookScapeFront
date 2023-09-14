import React, { useState, useEffect } from "react";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import { useRouter } from "next/router";
import styles from "./edtitarUsuario.module.css";

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

const EditarUsuario = () => {
  const router = useRouter();

  const { editarUsuario, editUsuarios, setEditarUsuario } = useUsuarioContext();

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

    // validar el password
  if (!editarUsuario?.newPassword) {
    newErrors.newPassword = "El password es obligatorio";
  } else if (editarUsuario.newPassword.length < 6) {
    newErrors.newPassword = "Se requiere un mínimo de 6 caracteres";
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
      setEditarUsuario(null);
      router.push("/admin");
    }
  };

  return (
    <div>
      <div>
        <h2>Editar Usuario</h2>
      </div>
      <form onSubmit={submitEditarUsuario}>
        <div>
          <label>Usuario</label>
          <input
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
            type="text"
            placeholder="Nueva contraseña"
            name="newPassword"
            value={editUsuario.newPassword}
            onChange={onChangeFormulario}
          />
          {errors.newPassword && <p className={styles.error}>{errors.newPassword}</p>}
        </div>
        <div>
          <label>Correo Electrónico</label>
          <input
            type="text"
            placeholder="email"
            name="email"
            value={editUsuario.email}
            onChange={onChangeFormulario}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        {/* agregar mas campos */}
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
