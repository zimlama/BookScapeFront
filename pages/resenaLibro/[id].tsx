import React, { useState, useEffect } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useAuthContext } from "@/context/AuthContext";
import styles from "./editar.module.css";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";
import { useBookContext } from "@/context/BookContext";
import axios from "axios";
import { useRouter } from "next/router";

type Resena = {
  bookId: number;
  userId: string | undefined;
  rating: number | undefined;
  review_text: string;
};

type ResenaBook = {
  title: string | undefined;
  rating_ave: number | undefined;
  image: string | undefined;
  review_text: string;
};

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

const ResenaLibro = () => {
  const router = useRouter();
  const { books } = useBookContext();
  const { user } = useAuthContext();

  const {
    query: { id },
  } = useRouter();

  const bookSelect = books.find((book) => book.id_book === Number(id));

  const [resenaBook, setResenaBook] = useState<ResenaBook>({
    title: bookSelect?.title,
    image: bookSelect?.image,
    rating_ave: 0,
    review_text: "",
  });

  // Actualizar un campo específico del formulario
  const onChangeFormulario = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResenaBook({
      ...resenaBook,
      [name]: value,
    });
  };

  const submitEditarUsuario = (e: React.FormEvent) => {
    e.preventDefault();

    // Realiza la solicitud GET a la API para obtener la información de los pagos
    const fetchReviews = async () => {
      try {
        const resena: Resena= {
          bookId: Number(id),
          userId: user?.id,
          rating: resenaBook.rating_ave,
          review_text: resenaBook.review_text,
        };
        const response = await axios.post(
          `${bookscapeback}/reviews/create`,
          resena
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error al guardar las reviews:", error);
      }
    };
    fetchReviews();

    router.push("/userAdmin");
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.liner}>
        <div className={styles.logo}>
          <Link href="/userAdmin">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
      </div>
      <div>
        <h3>Mi Cuenta</h3>
      </div>
      <div className={styles.menu}>
        <div className={styles.container}>
          <div>
            <h2>Calificar Mi Libro</h2>
            <img src={resenaBook.image} />
          </div>
          <form onSubmit={submitEditarUsuario}>
            <div>
              <input
                type="text"
                placeholder="Titulo"
                name="title"
                value={resenaBook.title}
                onChange={onChangeFormulario}
                className={styles.input}
              />
            </div>
            <div>
              <label>Reseña</label>
              <input
                type="text"
                placeholder="Escribe tus Comentarios"
                name="review_text"
                value={resenaBook.review_text}
                onChange={onChangeFormulario}
                className={styles.input}
              />
            </div>
            <div>
              <label>Puntuación</label>
              <input
                type="number"
                name="rating_ave"
                min="0"
                max="5"
                value={resenaBook.rating_ave}
                onChange={onChangeFormulario}
              />{" "}
              ★ ★ ★ ★ ★
            </div>
            <br />
            {/* agregar mas campos */}
            <button className={styles.button} type="submit">
              Guardar Cambios
            </button>
          </form>
        </div>
        <div className={styles.container}>
          <br />
          <Link href="/userAdmin" className={styles.button3}>
            Regresar Menú
          </Link>
          <br />
          <br />
          Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
      </div>
    </div>
  );
};

export default ResenaLibro;
