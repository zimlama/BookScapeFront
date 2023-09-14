import React, { useEffect, useState } from "react";
import styles2 from "./styles.module.css";
import logo from "../../public/images/BookScapeLogo.png";
import Link from "next/link";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import libros from "../../public/images/🦆 icon _categories major_.png";
import modify from "../../public/images/🦆 icon _Pen Square_.png";
import del from "../../public/images/🦆 icon _Times Circle_.png";
import styles from "../../components/Admin/styles.module.css";
import axios from "axios";
import { useUsuarioContext } from "@/context/UsuarioCrudContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface Usuario {
  id: string;
  username: string;
  email: string;
  deletedAt: string;
}

const RecuperarUsuario = () => {
  const { usuarios, deleteUsuario, setEditarUsuario } = useUsuarioContext();
  const router = useRouter();
  const [usuarioEliminados, setUsuarioEliminados] = useState<Usuario[]>([]);

  const recuperarUsuario = async (id: string) => {
    try {
      // Lógica para realizar el borrado lógico en la base de datos
      await axios.put(`${bookscapeback}/users/restore/${id}`);

      // Recargar la lista de libros después de eliminar
      const bookActualizado = usuarioEliminados.filter(
        (usuario) => usuario.id !== id
      );
      setUsuarioEliminados(bookActualizado);

      // Si se elimina, mostrar alerta
      Swal.fire(
        "Recuperado!",
        "El usuario se recuperó correctamente.",
        "success"
      );
    } catch (error) {
      console.error("Error al recuperar el usuario:", error);
      throw error;
    }
  };

  // Confirmar si desea eliminarlo
  const confirmarRecuperarUsuario = (id: any) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un usuario que se recupera, estar disponible para comprar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, recuperar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        recuperarUsuario(id);
      }
    });
  };

  // traer los libros borrados
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${bookscapeback}/users/removed`);
      const selectedFields = response.data.map((usuario: Usuario) => ({
        id: usuario.id,
        email: usuario.email,
        username: usuario.username,
        deletedAt: usuario.deletedAt,
      }));

      setUsuarioEliminados(selectedFields);
    } catch (error) {
      console.error("Error fetching usuarios:", error);
    }
  };

  return (
    <div>
      <div className={styles2.contenedor}>
        <div className={styles2.liner}>
          <div className={styles2.logo}>
            <Link href="/">
              <img src={logo.src} alt="Logo" />
            </Link>
          </div>
        </div>
        <div>
          <h3>Panel de Administrador</h3>
        </div>
        <div className={styles2.menu}>
          <div className={styles.contenedor}>
            <div className={styles.titulo}>
              <h2>
                <img src={libros.src} alt="Logo" />
                Recuperar Usuarios
              </h2><Link href='/admin' className={styles.button3}>Regresar Menú</Link>
              
            </div>
            <div className={styles.subTitulo}>
              <p>Recupera los usuarios borrados</p>
              
            </div>
            <div className={styles.resultados}>
              <div className={styles.titulo}></div>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" name="" id="" />
                      Seleccione
                    </th>
                    <th>Usuario</th>
                    <th>Email</th>
                    <th>Fecha</th>
                    <th>Recuperar</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarioEliminados.length === 0
                    ? "No hay Libros disponibles"
                    : usuarioEliminados.map((usuario, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" name="" id="" />
                          </td>
                          <td>{usuario.username}</td>
                          <td>{usuario.email}</td>
                          <td>{usuario.deletedAt}</td>
                          <td className={styles.selectores}>
                            <button
                              type="button"
                              onClick={() =>
                                confirmarRecuperarUsuario(usuario.id)
                              }
                              className={styles.deletebutton}
                            >
                              <img src={modify.src} alt="Recuperar" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
      </div>
    </div>
  );
};

export default RecuperarUsuario;
