import React, { FC, Fragment, useState, useEffect } from "react";
import usuariosImg from "../../../public/images/🦆 icon _Users icon_.png";
import styles from "../styles.module.css";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";


interface Usuario {
  id: string;
  username: string;
  newPassword: string;
  email: string;
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
  };
}

const TabUsuarios: FC<{}> = () => {
  const { user, isAuthenticated, setUser } = useAuthContext();
  const {  editUsuarios, usuarios, setEditarUsuario } = useUsuarioContext();
  const router = useRouter();
  
  const editarUsuario = {
    id: user?.id || "", 
    username: user?.username || "", 
    email: user?.email || "", 
    newPassword: "",
  }

  const [editUsuario, setEditUsuario] = useState<Usuario>({
    id: user?.id || "", 
    username: user?.username || "", 
    email: user?.email || "", 
    newPassword: "",
  });
  
  useEffect(() => {
    if (editarUsuario) {
      setEditUsuario(editarUsuario);
    }
  }, []);
   
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

    router.push("/userAdmin");
  };

  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={usuariosImg.src} alt="Logo" />
            Mi perfil
          </h2>
          </div>
        <div className={styles.subTitulo}>
          <p>Modifica tu perfil </p>
          
        </div>
        <div className={styles.resultados}>
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
        </div>
        {/* agregar mas campos */}
        <button className={styles.button} type="submit">Guardar Cambios</button>
      </form>   
          
        </div>
      </div>
    </Fragment>
  );
};
export default TabUsuarios;
