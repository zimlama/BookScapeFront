import Link from "next/link";
import styles from "../carritoDeCompra/carrito.module.css";
import logo from "../../public/images/carrito.png";
import React, { useEffect, useState } from "react";
import pago from "../../public/images/pay.png";
import { useAuthContext } from "@/context/AuthContext";
import { useCartBdContext } from "@/context/CartBdContext";
import { useCartContext } from "@/context/CartContext";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

// Función para guardar selectedItems en el local storage
// Función para guardar selectedItems en el local storage
const saveSelectedItemsToLocalStorage = (data:any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("selectedItems1", JSON.stringify(data));
  }
};

// Función para guardar selectedItems en el local storage
const saveSelectedItemsToLocalStorage1 = (data:any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("selectedItems1", JSON.stringify(data));
  }
};


// Función para cargar selectedItems desde el local storage
const loadSelectedItemsFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem("selectedItems1");
    return data ? JSON.parse(data) : {};
  }
};
const CarritoDeCompra = () => {
  const { user, isAuthenticated, rutaLogin } = useAuthContext();
  const { cartItems, actualizarCantidad, eliminarProducto } = useCartContext();
  const {
    cartItemsBd,
    actualizarCantidadBd,
    eliminarProductoBd,
    totalBd,
    setTotalBd,
    selectedItems,
    setSelectedItems,
  } = useCartBdContext();

  const [total, setTotal] = useState(0);
  const [paymentAttempted, setPaymentAttempted] = useState(false);
  const [selectedItems2, setSelectedItems2] = useState<{
    [id: string]: boolean;
  }>(() => {
    // Cargar selectedItems desde el local storage al inicializar el componente
    const storedSelectedItems = loadSelectedItemsFromLocalStorage();
    return storedSelectedItems;
  });

  useEffect(() => {
    localStorage.setItem("totalBd", totalBd.toFixed(2));
  }, [totalBd]);
  
  const handlePaymentButtonClick = () => {
    // Verifica si hay libros seleccionados
    if (isAuthenticated()) {
      const selectedBooksCount = Object.values(selectedItems).filter(
        (selected) => selected
      ).length;

      if (selectedBooksCount === 0) {
        // Si no hay libros seleccionados, marca el intento de pago
        setPaymentAttempted(true);
        alert("Selecciona al menos un libro para proceder al pago");
      } else {
        // Si hay libros seleccionados, procede al pago
        setPaymentAttempted(false); // Reinicia el estado de intento de pago
        // Agrega aquí la lógica para proceder al pago
      }
    } else {
      const selectedBooksCount = Object.values(selectedItems2).filter(
        (selected) => selected
      ).length;

      if (selectedBooksCount === 0) {
        // Si no hay libros seleccionados, marca el intento de pago
        setPaymentAttempted(true);
        alert("Selecciona al menos un libro para proceder al pago");
      } else {
        // Si hay libros seleccionados, procede al pago
        setPaymentAttempted(false); // Reinicia el estado de intento de pago
        // Agrega aquí la lógica para proceder al pago
      }
    }
  };

  useEffect(() => {
    // Calcular el total solo de los elementos seleccionados
    const calculoTotal = cartItemsBd.reduce((acc, item) => {
      if (selectedItems[item.id_book]) {
        return acc + item.cantidad * item.price;
      }
      return acc;
    }, 0);
    setTotalBd(calculoTotal);
  }, [cartItemsBd, selectedItems]);

  useEffect(() => {
    // Calcular el total solo de los elementos seleccionados
    const calculoTotal2 = cartItems.reduce((acc, item) => {
      if (selectedItems2[item.id_book]) {
        return acc + item.cantidad * item.price;
      }
      return acc;
    }, 0);

    setTotal(calculoTotal2);
  }, [cartItems, selectedItems2]);

  const toggleSelectItem = (itemId: number) => {
    setSelectedItems((prevSelected) => {
      const updatedSelectedItems = {...prevSelected,
      [itemId]: !prevSelected[itemId],
  };
    // Guardar los cambios en el local storage
    saveSelectedItemsToLocalStorage1(updatedSelectedItems);

    return updatedSelectedItems;
  })};

  const toggleSelectItem2 = (itemId: number) => {
    setSelectedItems2((prevSelected) => {
      const updatedSelectedItems2 = {...prevSelected,
      [itemId]: !prevSelected[itemId],
  };
    // Guardar los cambios en el local storage
    saveSelectedItemsToLocalStorage(updatedSelectedItems2);

    return updatedSelectedItems2;
  })};

  return (
    <>
      <div>
        <h1 className={styles.container3}>Carrito de Compra</h1> <br />
        <main>
          <div className={styles.container}>
            <h2>Artículos</h2>

            {isAuthenticated() && user ? (
              cartItemsBd.length === 0 ? (
                <div className={styles.container2}>
                  <h1>Tu Carrito de BookScape está vacío</h1>
                  <div className={styles.container3}>
                    <div className={styles.logo}>
                      <img src={logo.src} alt="Logo" />
                    </div>
                    <div>
                      <div>
                        <Link href={"/login"}>
                          <button className={styles.button} type="button">
                            Inicia sesión en tu cuenta
                          </button>
                        </Link>{" "}
                      </div>
                      <div>
                        <Link href={"/crearCuenta"}>
                          <button className={styles.button} type="button">
                            Regístrate ahora
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p>
                    El precio y la disponibilidad de los productos de
                    BookScape.com están sujetos a cambio. En el carrito de
                    compras puedes dejar temporalmente los productos que
                    quieras. Aparecerá el precio más reciente de cada producto.
                  </p>
                </div>
              ) : (
                cartItemsBd &&
                cartItemsBd.map((item, index) => (
                  <div className={styles.containerCar} key={index}>
                    <div className={styles.containerCar2}>
                      <div className={styles.imagen}>
                        <input
                          type="checkbox"
                          checked={selectedItems[item.id_book] || false}
                          onChange={() => toggleSelectItem(item.id_book)}
                        />
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div>
                        <h2>{item.title}</h2>
                        <h3>{item.authors}</h3>
                        <h3>
                          Valor: $ {(item.price * item.cantidad).toFixed(2)}
                        </h3>
                      </div>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => eliminarProductoBd(item.id_book)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )
            ) : cartItems.length === 0 ? (
              <div className={styles.container2}>
                <h1>Tu Carrito de BookScape está vacío</h1>
                <div className={styles.container3}>
                  <div className={styles.logo}>
                    <img src={logo.src} alt="Logo" />
                  </div>
                  <div>
                    <div>
                      <Link href={"/login"}>
                        <button className={styles.button} type="button">
                          Inicia sesión en tu cuenta
                        </button>
                      </Link>{" "}
                    </div>
                    <div>
                      <Link href={"/crearCuenta"}>
                        <button className={styles.button} type="button">
                          Regístrate ahora
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <p>
                  El precio y la disponibilidad de los productos de
                  BookScape.com están sujetos a cambio. En el carrito de compras
                  puedes dejar temporalmente los productos que quieras.
                  Aparecerá el precio más reciente de cada producto.
                </p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div className={styles.containerCar} key={index}>
                  <div className={styles.containerCar2}>
                    <div className={styles.imagen}>
                      <input
                        type="checkbox"
                        checked={selectedItems2[item.id_book] || false}
                        onChange={() => toggleSelectItem2(item.id_book)}
                      />
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div>
                      <h2>{item.title}</h2>
                      <h3>{item.authors}</h3>
                      <h3>
                        Valor: $ {(item.price * item.cantidad).toFixed(2)}
                      </h3>
                    </div>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={() => eliminarProducto(item.id_book)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <aside className={styles.resumen}>
            <div className={styles.oculto}>
              <p>Resumen del pedido</p>
            </div>
            {isAuthenticated() && user ? (
              <>
                {totalBd === 0 ? (
                  <>
                    <p>No hay libros seleccionados</p>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handlePaymentButtonClick}
                    >
                      Proceder al Pago
                    </button>
                  </>
                ) : (
                  <>
                    {" "}
                    <h4>Total: ${totalBd.toFixed(2)}</h4>
                    <Link href={"/checkout"}>
                      <button className={styles.button} type="button">
                        Proceder al Pago
                      </button>
                      <br />
                    </Link>
                    <br /> <img src={pago.src} alt="Logo" />
                  </>
                )}
              </>
            ) : (
              <>
                {total === 0 ? (
                  <>
                    <p>No hay libros seleccionados</p>
                    <button
                      className={styles.button}
                      type="button"
                      onClick={handlePaymentButtonClick}
                    >
                      Proceder al Pago
                    </button>
                  </>
                ) : (
                  <>
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <Link href={"/login"}>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => rutaLogin("/checkout")}
                      >
                        Proceder al Pago
                      </button>
                      <br />
                    </Link>
                    <br /> <img src={pago.src} alt="Logo" />
                  </>
                )}
              </>
            )}
          </aside>
        </main>
      </div>
    </>
  );
};

export default CarritoDeCompra;
