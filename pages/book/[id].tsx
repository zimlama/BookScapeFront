import React, { useState } from "react";
import { useRouter } from "next/router";
import { useBookContext } from "@/context/BookContext";
import styles from "./detail.module.css";
import Rating from "../../components/Rating/Rating";
import Link from "next/link";
import { useCartContext } from "@/context/CartContext";
import { useCartBdContext } from "@/context/CartBdContext";
import { useAuthContext } from "@/context/AuthContext";
import { useFilterContext } from "@/context/FilterContext";
import Swal from "sweetalert2";

const DetallesBook = () => {
  const { user, isAuthenticated } = useAuthContext();
  const [cantidad, setCantidad] = useState(1);
  const { books } = useBookContext();
  const {
    query: { id },
  } = useRouter();

  const detallebook = books.find((book) => book.id_book === Number(id));

  const { agregarCarrito } = useCartContext();
  const { agregarCarritoBd } = useCartBdContext();

  const { aplyFilters, busqueda } = useFilterContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Cantidad no válida");
      return;
    }

    if (detallebook) {
      const cartItem = {
        id_book: detallebook.id_book,
        title: detallebook.title,
        price: detallebook.price,
        image: detallebook.image,
        authors: detallebook.Authors.map((author) => author.name),
        cantidad,
      };

      if (user && isAuthenticated()) {
        agregarCarritoBd(cartItem);
      } else {
        agregarCarrito(cartItem);
      }

      // Primero, obtén el array actual de cantidadDb del localStorage (si existe)
      const storedCantidadDb = JSON.parse(
        localStorage.getItem("cantidad") || "[]"
      );

      // Luego, verifica si el usuario está autenticado y hay un cartItem
      if (user && isAuthenticated() && cartItem) {
        // Verifica si ya existe un objeto con el mismo id_book en el array
        const existingIndex = storedCantidadDb.findIndex(
          (item: any) => item.id_book === cartItem.id_book
        );

        // Si existe, actualiza la cantidad en el objeto existente
        if (existingIndex !== -1) {
          storedCantidadDb[existingIndex].cantidad = cartItem.cantidad;
        } else {
          // Si no existe, crea un nuevo objeto para el nuevo elemento
          const newCantidadObj = {
            id_book: cartItem.id_book,
            cantidad: cartItem.cantidad,
          };
          // Agrega el nuevo objeto al array almacenado
          storedCantidadDb.push(newCantidadObj);
        }

        // Guarda el array actualizado en el localStorage
        localStorage.setItem("cantidad", JSON.stringify(storedCantidadDb));
      }
    }
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'El libro se agrego al carrito',
      showConfirmButton: false,
      timer: 1800
    })
  };

  return (
    <div>
      {detallebook ? (
        <div className={styles.container}>
          <div className={styles.izquierda}>
            {aplyFilters ? (
              busqueda ? (
                <Link href={`/buscar?q=${busqueda}`}>
                  {" "}
                  <button className={styles.button}>Regresar</button>
                </Link>
              ) : (
                <Link href={"/filtrar"}>
                  <button className={styles.button}>Regresar</button>
                </Link>
              )
            ) : (
              <Link href={`/buscar?q=${busqueda}`}>
                {" "}
                <button className={styles.button}>Regresar</button>
              </Link>
            )}

            <div className={styles.imagen}>
              <img src={detallebook.image} alt={detallebook.title} />
              <Rating rating_ave={detallebook.rating_ave} />
            </div>
          </div>
          <div className={styles.derecha}>
            <div className={styles.titulo}>
              <h1>{detallebook.title}</h1>
            </div>
            <div className={styles.autor}>
              <h3>{detallebook.Authors.map((author) => author.name)}</h3>
            </div>
            <div className={styles.descripcion}>
              <h4>Descripción:</h4>
              <p> {detallebook.description}</p>
            </div>
            <div className={styles.detalles}>
              <div>
                <h3>Genero: </h3>
                {detallebook.Tags.map((tag) => tag.name)}
              </div>
              <div>
                <h2>${detallebook.price}</h2>
              </div>

              <div className={styles.formulario}>
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="submit"
                      value="Agregar al carrito "
                      className={styles.button}
                    />
                  </div>
                  <div>
                    {aplyFilters ? (
                      busqueda ? (
                        <Link href={`/buscar?q=${busqueda}`}>
                          {" "}
                          <button className={styles.button}>Regresar</button>
                        </Link>
                      ) : (
                        <Link href={"/filtrar"}>
                          <button className={styles.button}>Regresar</button>
                        </Link>
                      )
                    ) : (
                      <Link href={`/buscar?q=${busqueda}`}>
                        {" "}
                        <button className={styles.button}>Regresar</button>
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Book not found</p>
      )}
    </div>
  );
};

export default DetallesBook;
