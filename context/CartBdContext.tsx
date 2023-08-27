import axios from "axios";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import { useAuthContext } from "@/context/AuthContext";

interface CartItem {
  id_book: number;
  title: string;
  price: number;
  image: string;
  authors: string[];
  cantidad: number;
}

interface CartContextType {
  cartItemsBd: CartItem[];
  agregarCarritoBd: (item: CartItem) => void;
  eliminarProductoBd: (id: number) => void;
  actualizarCantidadBd: (cart: CartItem) => void;
}

const CartBdContext = createContext<CartContextType | undefined>(undefined);

export const useCartBdContext = (): CartContextType => {
  const context = useContext(CartBdContext);
  if (!context) {
    throw new Error("useCartContext debe usarse dentro de un CartProvider");
  }
  return context;
};

export const CartBdProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user, isAuthenticated, rutaLogin } = useAuthContext();
  const initialState: CartItem[] = [];
  const [cartItemsBd, setCartItemsBd] = useState<CartItem[]>(initialState);

  useEffect(() => {
    if (isAuthenticated() && user) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/shoppingcart/books/${user.shoppingcartId.cart_id}`
          );

          // Agregar la propiedad "cantidad" a cada elemento en el array
          const cantidadLS = JSON.parse(
            localStorage.getItem("cantidad") || "null"
          );
          
          const cartItemsCantidad = response.data.Books.map(
            (book: CartItem) => ({
              ...book,
              cantidad: book.id_book === cantidadLS.id_book ? cantidadLS.cantidad : 1,
            })
          );
          
          setCartItemsBd(cartItemsCantidad);
        } catch (error) {
          console.error(
            "Error al traer los libros de la base de datos en el carrito",
            error
          );
        }
      };

      fetchData();
    }
  }, [isAuthenticated, user]);

  const agregarCarritoBd = async (cart: CartItem): Promise<void> => {
    try {
      if (cartItemsBd.some((cartState) => cartState.id_book === cart.id_book)) {
        const carritoActualizado = cartItemsBd.map((cartState) => {
          if (cartState.id_book === cart.id_book) {
            return { ...cartState, cantidad: cart.cantidad };
          }
          return cartState;
        });

        setCartItemsBd(carritoActualizado);

        await axios.put("http://localhost:3001/shoppingcart/add", {
          id_cart: user?.shoppingcartId.cart_id,
          id_book: cart.id_book,
        });
      } else {
        setCartItemsBd([...cartItemsBd, cart]);

        await axios.put("http://localhost:3001/shoppingcart/add", {
          id_cart: user?.shoppingcartId.cart_id,
          id_book: cart.id_book,
        });
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const eliminarProductoBd = async (id: number): Promise<void> => {
    try {
      if (user) {
        const response = await axios.delete("http://localhost:3001/shoppingcart/remove", {
          data: {
            id_cart: user.shoppingcartId.cart_id,
            id_book: id,
          },
        });

        console.log(response.data);
        
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      // Puedes agregar aquí código para mostrar un mensaje de error al usuario
    }
    const carritoActualizado = cartItemsBd.filter((cart) => cart.id_book !== id);
    setCartItemsBd(carritoActualizado);
  };

  const actualizarCantidadBd = (cart: CartItem): void => {
    const carritoActualizado = cartItemsBd.map((cartState) => {
      if (cartState.id_book === cart.id_book) {
        (cartState.cantidad = cart.cantidad);
      }
      return cartState;
    });

    setCartItemsBd(carritoActualizado);
  };

  const contextValue: CartContextType = {
    cartItemsBd,
    agregarCarritoBd,
    eliminarProductoBd,
    actualizarCantidadBd,
  };

  return (
    <CartBdContext.Provider value={contextValue}>
      {children}
    </CartBdContext.Provider>
  );
};
