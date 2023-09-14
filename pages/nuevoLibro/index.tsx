import React, { useState } from "react";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useBookContext } from "@/context/BookContext";
import { useRouter } from "next/router";
import styles from "./nuevo.module.css";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";

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

interface ValidarNuevosLibrosErrores {
  id_book?: string;
  isbn?: string;
  title?: string;
  Authors?: string;
  published_date?: string;
  price?: string;
  description?: string;
  rating_ave?: string;
  image?: string;
  page_count?: string;
  Tags?: string;
  Language?: string;
}

const NuevoLibro = () => {
  const { newBook, errorNewBook } = useCrudBookContext();
  const { books } = useBookContext();
  const router = useRouter();

  const [nuevoLibroData, setNuevoLibroData] = useState<Book>({
    id_book: books.length + 1,
    isbn: 30000000 * books.length + 1,
    title: "",
    published_date: 0,
    description: "",
    rating_ave: 0,
    price: 0.0,
    image: "",
    page_count: 0,
    Authors: [
      {
        name: "",
      },
    ],
    Tags: [
      {
        name: "",
      },
    ],
    Language: {
      language: "",
    },
  });

  const [errors, setErrors] = useState<Partial<ValidarNuevosLibrosErrores>>({});
  // Función para validar el formulario
  const isFormValid = () => {
    const newErrors: Partial<ValidarNuevosLibrosErrores> = {};

    if (nuevoLibroData.title.trim() === "") {
      newErrors.title = "El título es requerido";
    }
    if (!nuevoLibroData.Authors) {
      newErrors.Authors = "Introduce el nombre del autor";
    }

    if (nuevoLibroData.published_date && nuevoLibroData.published_date <= 0) {
      newErrors.published_date = "El año de publicación debe ser mayor que 0";
    }

    if (!nuevoLibroData.price || nuevoLibroData.price <= 0) {
      newErrors.price = "El precio debe ser mayor que 0";
    }

    if (!nuevoLibroData.description) {
      newErrors.description = "Introduce una descripción del libro";
    }

    if (!nuevoLibroData.image) {
      newErrors.image = "Introduce la URL de la imagen de portada";
    }

    if (nuevoLibroData.page_count && nuevoLibroData.page_count < 0) {
      newErrors.page_count =
        "La cantidad de páginas debe ser mayor o igual a 0";
    }

    if (!nuevoLibroData.Language) {
      newErrors.Language = "Introduce el lenguaje del libro";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Cuando el administrador haga submit
  const submitNuevoLibro = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulario
    if (!isFormValid()) {
      return; // No enviar el formulario si hay errores
    }
    // Si no hay errores
    // Crear el nuevo Libro
    newBook(nuevoLibroData);
    router.push("/admin");
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.liner}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
      </div>
      <div>
        <h2>Agregar Nuevo Libro</h2>
      </div>
      <div className={styles.menu}>
        <form onSubmit={submitNuevoLibro}>
          <div>
            <label>Titulo</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Titulo"
              name="title"
              value={nuevoLibroData.title}
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  title: e.target.value,
                }));
              }}
            />
            {errors.title && <p className={styles.error}>{errors.title}</p>}
          </div>
          <div>
            <label>Imagen de Portada</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Portada"
              name="image"
              value={nuevoLibroData.image}
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  image: e.target.value,
                }));
              }}
            />
            {errors.image && <p className={styles.error}>{errors.image}</p>}
          </div>
          <div>
            <label>Autor</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Autor"
              name="Authors"
              value={
                nuevoLibroData.Authors[0] ? nuevoLibroData.Authors[0].name : ""
              }
              onChange={(e) => {
                const newAuthors = [
                  {
                    name: e.target.value,
                  },
                ];
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  Authors: newAuthors,
                }));
              }}
            />
            {errors.Authors && <p className={styles.error}>{errors.Authors}</p>}
          </div>
          <div>
            <label>Precio</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Precio"
              name="price"
              min="0"
              value={nuevoLibroData.price}
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  price: Number(e.target.value),
                }));
              }}
            />
            {errors.price && <p className={styles.error}>{errors.price}</p>}
          </div>
          <div>
            <label>Año de publicación</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Año de publicación"
              name="published_date"
              value={nuevoLibroData.published_date}
              min="0"
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  published_date: Number(e.target.value),
                }));
              }}
            />
            {errors.published_date && (
              <p className={styles.error}>{errors.published_date}</p>
            )}
          </div>
          <div>
            <label>Descripción</label>
            <input
              className={styles.textarea}
              type="text-area"
              placeholder="descripción"
              name="description"
              value={nuevoLibroData.description}
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  description: e.target.value,
                }));
              }}
            />
            {errors.description && (
              <p className={styles.error}>{errors.description}</p>
            )}
          </div>
          <div>
            <label>Categorías</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Categorías"
              name="Tags"
              value={nuevoLibroData.Tags[0] ? nuevoLibroData.Tags[0].name : ""}
              onChange={(e) => {
                const newTags = [
                  {
                    name: e.target.value,
                  },
                ];
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  Tags: newTags,
                }));
              }}
            />
            {errors.Tags && <p className={styles.error}>{errors.Tags}</p>}
          </div>
          <div>
            <label>Cantidad de paginas</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Cantidad de paginas"
              name="page_count"
              value={nuevoLibroData.page_count}
              min="0"
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  page_count: Number(e.target.value),
                }));
              }}
            />

            {errors.page_count && (
              <p className={styles.error}>{errors.page_count}</p>
            )}
          </div>
          <div>
            <label>Lenguaje</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Lenguaje"
              name="Language"
              value={nuevoLibroData.Language.language}
              onChange={(e) => {
                setNuevoLibroData((prevData) => ({
                  ...prevData,
                  Language: { language: e.target.value },
                }));
              }}
            />
            {errors.Language && (
              <p className={styles.error}>{errors.Language}</p>
            )}
          </div>
          <button className={styles.button} type="submit">
            Agregar Libro
          </button>
        </form>
      </div>
      <div className={styles.container}  >
        <br />
        <Link href='/admin' className={styles.button3} >Regresar Menú</Link>
        <br /><br />
         Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
      {errorNewBook ? <p>Hubo un error al cargar el libro</p> : null}
    </div>
  );
};

export default NuevoLibro;
