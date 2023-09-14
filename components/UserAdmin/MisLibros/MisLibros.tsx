import React, { FC, Fragment, useState, useEffect } from "react";
import libros from "../../../public/images/🦆 icon _categories major_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

type Language = {
  language: string;
};
// Definición del tipo de objeto "Book"
type Author = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Tags = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Book = {
  id_book: number;
  isbn: number;
  title: string;
  Authors: Author[];
  published_date: number;
  price: number;
  description: string;
  rating_ave: number;
  image: string;
  page_count: number;
  Tags: Tags[];
  Language: Language;
};

const TabLibros: FC<{}> = () => {
  const { user, isAuthenticated } = useAuthContext();
  const { books } = useBookContext();
  const { deleteBook, setEditarBook } = useCrudBookContext();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  
  const confirmarAgregarReseña = (book:Book) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Vas agregar una reseña a un libro",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, agregar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push(`/resenaLibro/${book.id_book}`);
      }
    });
  };

  const userId = user?.id; // Reemplaza esto con la lógica para obtener el ID del usuario

  // Estado para almacenar los datos recuperados del almacenamiento local
  const [bookPays, setBookPays] = useState<number[]>([]);

  useEffect(() => {
    // Construir la clave para el usuario específico
    const userLocalStorageKey = `bookPays_${userId}`;

    // Obtener los datos del almacenamiento local
    const userDataString = localStorage.getItem(userLocalStorageKey);

    if (userDataString) {
      // Si se encuentran datos para el usuario, parsearlos y actualizar el estado
      const userData = JSON.parse(userDataString);
      setBookPays(userData);
    }
  }, [userId]); 

  const selectedBooks = books.filter((book) => bookPays.includes(book.id_book));

  return (
    <Fragment>
      <div className={styles.contenedor}>
        <div className={styles.titulo}>
          <h2>
            <img src={libros.src} alt="Logo" />
            Mis Libros
          </h2>
        </div>
        <div className={styles.resultados}>
          <div className={styles.titulo}></div>
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Titulo</th>
                <th>Autor</th>
                <th>Reseña</th>
                <th>Descargar</th>
              </tr>
            </thead>
            <tbody>
            {selectedBooks.length === 0
                ? "No hay Libros disponibles"
                : selectedBooks.map((book, index) => (
                    <tr key={index}>
                      <td className={styles.libro}>
                        <img src={book.image} alt={book.title} />
                      </td>
                      <td>{book.title}</td>
                      <td>
                        {book.Authors.map((obj: any, index: any) => (
                          <span key={index}>{obj.name}</span>
                        ))}
                      </td>
                      <td className={styles.selectores}>
                      <button
                          className={styles.deletebutton}
                          onClick={() => confirmarAgregarReseña(book)}
                        >
                       <img src={modify.src} alt="Modificar" />
                       </button></td>
              </tr>
              ))}
                  
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default TabLibros;
