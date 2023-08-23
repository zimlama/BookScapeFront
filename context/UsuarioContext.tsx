import React, { createContext, useContext, useState, ReactNode } from "react";

interface Usuario {
  username: string;
  email: string;
  password: string;
}

interface UsuarioContextType {
  usuarios: Usuario[];
  agregarUsuario: (usuario: Usuario) => void;
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

  const agregarUsuario = (usuario: Usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  const contextValue: UsuarioContextType = {
    usuarios,
    agregarUsuario,
  };

  return (
    <UsuarioContext.Provider value={contextValue}>
      {children}
    </UsuarioContext.Provider>
  );
}
