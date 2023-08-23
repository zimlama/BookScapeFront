import React, { useState } from "react";
import { useRouter } from "next/router";
import { useBookContext } from "@/context/BookContext";
import styles from "./detail.module.css";
import Rating from "../../components/Rating/Rating";
import Link from "next/link";
import { IoIosCart } from "react-icons/io";
import { useCartContext } from "@/context/CartContext";

const DetallesBook = () => {
  const [cantidad, setCantidad] = useState(1);
  const { books } = useBookContext();
  const {
    query: { id },
  } = useRouter();

  const detallebook = books.find((book) => book.id_book === Number(id));

  const { agregarCarrito, cartItems } = useCartContext();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (cantidad < 1) {
      alert("Cantidad no válida");
      return;
    }

    if (detallebook) {
      const cartItem = {
        id: detallebook.id_book,
        title: detallebook.title,
        price: detallebook.price,
        image: detallebook.image,
        authors: detallebook.Authors.map((author) => author.name),
        cantidad,
      };

      agregarCarrito(cartItem);
    }
  };

  return (
    <div>
      {detallebook ? (
        <div className={styles.container}>
          <div className={styles.izquierda}>
            <Link href={"/"}>Regresar</Link>
            <div className={styles.imagen}>
              <img src={detallebook.image} alt={detallebook.title} />
              <Rating ratingCount={detallebook.rating_ave} />
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
              <div><h3>Genero: </h3>{detallebook.Tags.map((tag) => tag.name)}</div>
              <div>
                <h2>${detallebook.price}</h2>
              </div>

              <div className={styles.formulario}>
                <form onSubmit={handleSubmit}>
                  <div> <label htmlFor="cantidad">Cantidad:</label>
                  <select
                    id="cantidad"
                    onChange={(e) => setCantidad(+e.target.value)}
                  >
                    <option value="0"></option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select></div>
                  <div><input 
                    type="submit"
                    value="Agregar al carrito "
                    className={styles.button}
                  /></div>
                  <div><Link href={`/`} >
                    <button className={styles.button}>
                      Regresar
                    </button>
                  </Link></div>
                
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
