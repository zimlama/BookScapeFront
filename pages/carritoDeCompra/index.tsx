import Link from "next/link";
import styles from "../carritoDeCompra/carrito.module.css";
import logo from "../../public/images/carrito.png";
import React, { useEffect, useState } from "react";
import { useCartContext } from "@/context/CartContext";
import pago from "../../public/images/mercadopago.webp";

const CarritoDeCompra = () => {
  const { cartItems, actualizarCantidad, eliminarProducto } = useCartContext();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculoTotal = cartItems.reduce(
      (total, item) => total + item.cantidad * item.price,
      0
    );
    setTotal(calculoTotal);
  }, [cartItems]);

  return (
    <>
      <div >
        <h1 className={styles.container3}>Carrito de Compra</h1> <br />
        <main>
            <div className={styles.container}>
              <h2>Artículos</h2>

              {cartItems.length === 0 ? (
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
                cartItems.map((item, index) => (
                  <div className={styles.containerCar} key={index}>
                    <div className={styles.containerCar2}>
                      <div className={styles.imagen}>
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div>
                        <h2>{item.title}</h2>
                        <h3>{item.authors.join(", ")}</h3>
                        <div>
                          <h3>Cantidad:</h3>
                          <select
                            onChange={(e) =>
                              actualizarCantidad({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.image,
                                authors: item.authors,
                                cantidad: parseInt(e.target.value),
                              })
                            }
                            value={item.cantidad}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                        <h3>
                          $ <span>{item.price}</span>
                        </h3>
                        <h3>
                          Valor: ${" "}
                          {(item.price * item.cantidad).toFixed(2)}
                        </h3>
                      </div>
                      <button
                        className={styles.button}
                        type="button"
                        onClick={() => eliminarProducto(item.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
              <aside className={styles.resumen}>
              <h3>Resumen del pedido</h3>
              <h2>Total a pagar: $ {total.toFixed(2)}</h2>
              <Link href={"http://mpago.li/2NZfEab"}>
              <button data-preference-id="97116827-f207eb10-4eb8-4fc2-b6b4-2836e6ad3aa8"  className={styles.button} type="button">
               Pagar
                </button><br />
                        </Link> 
                        <br /> <img src={pago.src} alt="Logo" />
            </aside>
    
          </main>
                       
      </div>
   
    </>
  );
};

export default CarritoDeCompra;
