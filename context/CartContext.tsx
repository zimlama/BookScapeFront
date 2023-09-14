import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useAuthContext } from "@/context/AuthContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; // Obtiene la URL base del archivo .env.local

interface CartItem {
  id_book: number;
  title: string;
  price: number;
  image: string;
  authors: string[];
  cantidad: number;
}

interface CartContextType {
  cartItems: CartItem[];
  agregarCarrito: (item: CartItem) => void;
  eliminarProducto: (id: number) => void;
  actualizarCantidad: (cart: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCartContext = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated, rutaLogin } = useAuthContext();
  const initialState: CartItem[] = [];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState);
  

  useEffect(() => {
    if (!user) {
      const carritoLS = JSON.parse(
        localStorage.getItem("cart") || "null"
      ) as CartItem[];
      if (carritoLS) {
        setCartItems(carritoLS);
      }
    }
  }, [user]); // Solo dependencias primitivas

  useEffect(() => {
    if (!user) {
      if (cartItems !== initialState) {
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    }
  }, [cartItems]);

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${bookscapeback}/shoppingcart/books/${user.shoppingcartId.cart_id}`
          );

          // Agregar la propiedad "cantidad" a cada elemento en el array
          const cartItemsWithCantidad = response.data.Books.map((book: CartItem) => ({
            ...book,
            cantidad: 1, // Puedes establecer la cantidad inicial según tus necesidades
          }));

          setCartItems(response.data.Books);
        } catch (error) {}
      };
      fetchData();
    }
  }, [user]);

  
  const agregarCarrito = (cart: CartItem): void => {
    if (cartItems.some((cartState) => cartState.id_book === cart.id_book)) {
      const carritoActualizado = cartItems.map((cartState) => {
        if (cartState.id_book === cart.id_book) {
          cartState.cantidad = cart.cantidad;
        }
        return cartState;
      });

      setCartItems([...carritoActualizado]);
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } else {
      setCartItems([...cartItems, cart]);
      window.localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  };


  const eliminarProducto = (id: number): void => {
    const carritoActualizado = cartItems.filter((cart) => cart.id_book !== id);
    setCartItems(carritoActualizado);
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const actualizarCantidad = (cart: CartItem): void => {
    const carritoActualizado = cartItems.map((cartState) => {
      if (cartState.id_book === cart.id_book) {
        (cartState.cantidad = cart.cantidad), 10;
      }
      return cartState;
    });
    setCartItems(carritoActualizado);
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const contextValue: CartContextType = {
    cartItems,
    agregarCarrito,
    eliminarProducto,
    actualizarCantidad,
    
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
