import axios from "axios";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Swal from "sweetalert2";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

interface Usuario {
  id: string;
  username: string;
  newPassword: string;
  email: string;
}

interface UsuarioContextType {
  usuarios: Usuario[];
  agregarUsuario: (usuario: Usuario) => void;
  deleteUsuario: (id: string) => Promise<void>;
  editUsuarios: (editBook: Usuario) => void;
  setEditarUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
  editarUsuario: Usuario | null;
}

interface UsuarioProviderProps {
  children: ReactNode;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const useUsuarioContext = () => {
  const context = useContext(UsuarioContext);
  if (!context) {
    throw new Error(
      "useUsuarioContext debe usarse dentro de un UsuarioProvider"
    );
  }
  return context;
};

export function UsuarioProvider({ children }: UsuarioProviderProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  // obtener el libro que vamos a editar
  const [editarUsuario, setEditarUsuario] = useState<Usuario | null>(null);

  /// Cargar Usuarios
  useEffect(() => {
    async function fetchUsuarios() {
      try {
        const response = await axios.get(`${bookscapeback}/users/`);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    }

    fetchUsuarios();
  }, []);
  

  const agregarUsuario = (usuario: Usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  // Eliminar usuarios
  const deleteUsuario = async (id: string) => {
    try {
      // Lógica para realizar el borrado lógico en la base de datos
     await axios.delete(`${bookscapeback}/users/${id}`)
      
      // Recargar la lista de libros después de eliminar
      const usuarioActualizado = usuarios.filter((usuario) => usuario.id !== id);
      setUsuarios(usuarioActualizado);

      // Si se elimina, mostrar alerta
      Swal.fire("Eliminado!", "El usuario se eliminó correctamente.", "success");
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  };

  // editar usuarios
  const editUsuarios = async(editUsuario: Usuario) => {
    try {
      console.log(`Editar Usuario ${editUsuario.username}`);
      // mandar el producto editado a la api
      await axios.put(`${bookscapeback}/users/update/`, editUsuario)

      const usuarioEditados = usuarios.map((usuario) => usuario.id === editUsuario.id ? usuario = editUsuario : usuario );
      
      setUsuarios(usuarioEditados);
      Swal.fire("Editado!", "El usuario se editó correctamente.", "success");
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      throw error;
    }
}


  const contextValue: UsuarioContextType = {
    usuarios,
    agregarUsuario,
    deleteUsuario,
    editUsuarios,
    setEditarUsuario,
    editarUsuario
  };

  return (
    <UsuarioContext.Provider value={contextValue}>
      {children}
    </UsuarioContext.Provider>
  );
}
