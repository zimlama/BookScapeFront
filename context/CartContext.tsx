import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  id: number;
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
  
  const initialState: CartItem[] = [];
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState);
  
  useEffect(() => {
    const carritoLS = JSON.parse(
      localStorage.getItem("cart") || "null"
    ) as CartItem[];
    if (carritoLS) {
      setCartItems(carritoLS);
    }
  }, []);

  useEffect(() => {
    if (cartItems !== initialState) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const agregarCarrito = (cart: CartItem): void => {
    if (cartItems.some((cartState) => cartState.id === cart.id)) {
      const carritoActualizado = cartItems.map((cartState) => {
        if (cartState.id === cart.id) {
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
    const carritoActualizado = cartItems.filter((cart) => cart.id !== id);
    setCartItems(carritoActualizado);
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const actualizarCantidad = (cart: CartItem): void => {
    const carritoActualizado = cartItems.map((cartState) => {
      if (cartState.id === cart.id) {
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
