import React, { useEffect, useState } from "react";
import styles2 from "./styles.module.css";
import logo from "../../public/images/BookScapeLogo.png";
import Link from "next/link";
import { useBookContext } from "@/context/BookContext";
import { useCrudBookContext } from "@/context/CrudBookContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import libros from "../../public/images/🦆 icon _categories major_.png";
import modify from "../../public/images/🦆 icon _Pen Square_.png";
import del from "../../public/images/🦆 icon _Times Circle_.png";
import styles from "../../components/Admin/styles.module.css";
import axios from "axios";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK; 


type Book = {
  id_book: number;
  title: string;
  price: number;
  deletedAt: string;
  image: string;
};

const RecuperarLibro = () => {
  const { books } = useBookContext();
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<number>(1);
  const [booksEliminados, setBooksEliminados] = useState<Book[]>([]);

  const recuperarBook = async (id_book: number) => {
    try {
      // Lógica para realizar el borrado lógico en la base de datos
     await axios.put(`${bookscapeback}/books/restore/${id_book}`)
      
      // Recargar la lista de libros después de eliminar
      const bookActualizado = booksEliminados.filter((book) => book.id_book !== id_book);
      setBooksEliminados(bookActualizado);

      // Si se elimina, mostrar alerta
      Swal.fire("ERecuperado!", "El libro se recuperó correctamente.", "success");
    } catch (error) {
      console.error("Error al recuperar el libro:", error);
      throw error;
    }
  };
 
  // Confirmar si desea eliminarlo
  const confirmarRecuperarLibro = (id: any) => {
    // preguntar al usuario
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Un libro que se recupera, estar disponible a la venta",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, recuperar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // pasar a eliminarlo
        recuperarBook(id);
      }
    });
  };

  // traer los libros borrados
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${bookscapeback}/books/removed`);
      const selectedFields = response.data.map((book:Book) => ({
        id_book: book.id_book,
        title: book.title,
        price: book.price,
        image: book.image,
        deletedAt: book.deletedAt,
      }));
      
      setBooksEliminados(selectedFields);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  
  return (
    <div>
      <div className={styles2.contenedor}>
        <div className={styles2.liner}>
          <div className={styles2.logo}>
            <Link href="/">
              <img src={logo.src} alt="Logo" />
            </Link>
          </div>
        </div>
        <div>
          <h3>Panel de Administrador</h3>
        </div>
        <div className={styles2.menu}>
          <div className={styles.contenedor}>
            <div className={styles.titulo}>
              <h2>
                <img src={libros.src} alt="Logo" />
                Recuperar Libros
              </h2><Link href='/admin' className={styles.button3}>Regresar Menú</Link>
            </div>
            <div className={styles.subTitulo}>
            <p>Recupera libros borrados</p>
              
              <div className={styles.tabsContainer}>       
              </div>
            </div>
            <div className={styles.resultados}>
              <div className={styles.titulo}></div>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" name="" id="" />
                      Seleccione
                    </th>
                    <th>Imagen</th>
                    <th>Titulo</th>
                    <th>Valor</th>
                    <th>Fecha</th>
                    <th>Recuperar</th>
                  </tr>
                </thead>
                <tbody>
                  {booksEliminados.length === 0
                    ? "No hay Libros disponibles"
                    : booksEliminados.map((book, index) => (
                        <tr key={index}>
                          <td>
                            <input type="checkbox" name="" id="" />
                          </td>
                          <td className={styles.libro}>
                            <img src={book.image} alt={book.title} />
                          </td>
                          <td>{book.title}</td>
                          <td>${book.price}</td>
                          <td>{book.deletedAt}</td>
                          <td className={styles.selectores}>
                            <button
                              type="button"
                              onClick={() => confirmarRecuperarLibro (book.id_book) }
                              className={styles.deletebutton}
                            >
                              <img src={modify.src} alt="Recuperar" />
                            </button>
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          Si tiene alguna duda puede contactar al Desarrollador BookScape
        </div>
      </div>
    </div>
  );
};

export default RecuperarLibro;
