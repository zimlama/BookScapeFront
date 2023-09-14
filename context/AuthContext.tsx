import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  message: string | undefined;
  id: string | undefined;
  email: string;
  username: string;
  admin: boolean | undefined;
  token: string | undefined;
  shoppingcartId: {
      cart_id: number;
  } | undefined;
};

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (newToken: string, userData: User) => void;
  rutaLogin: (redirectTo: string ) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  setUser:React.Dispatch<React.SetStateAction<User | null>>
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Intentar cargar el token y usuario desde el almacenamiento local
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("authUser");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para iniciar sesión y establecer el token y la información del usuario
  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);

    // Guardar en el almacenamiento local
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("authUser", JSON.stringify(userData));

  };

  const rutaLogin = (redirectTo: string) => {
    // Guardar la URL de redirección en localStorage
    localStorage.setItem('redirectAfterLogin', redirectTo);
  };

  // Función para cerrar sesión y eliminar el token y la información del usuario
  const logout = () => {
    setToken(null);
    setUser(null);

    // Eliminar del almacenamiento local
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  // Creación del objeto "contextValue" con la información del contexto
  const contextValue: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated,
    rutaLogin,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
