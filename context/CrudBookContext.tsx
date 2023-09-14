import React, { createContext, FC, useContext, useState } from "react";
import { useBookContext } from "@/context/BookContext"; // Importa tu contexto de libros existente
import Swal from "sweetalert2";
import axios from "axios";

const bookscapeback = process.env.NEXT_PUBLIC_BOOKSCAPEBACK;

type Language = {
  language: string;
}
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

type BookNew = {
  id_book: number;
  isbn: number;
  title: string;
  authors: string[];
  published_date: number;
  price: number;
  description: string;
  image: string;
  page_count: number;
  publisher: string;
  tags: string[];
  language: string;
  url: null;
};


interface CrudBookContextType {
  deleteBook: (id_book: number) => Promise<void>;
  newBook: (bookNew: Book) => void;
  editBooks: (editBook: Book) => void;
  errorNewBook: boolean;
  setEditarBook: React.Dispatch<React.SetStateAction<Book | null>>;
  editarBook: Book | null;
}

type CrudBookProviderProps = {
  children: React.ReactNode;
};

const CrudBookContext = createContext<CrudBookContextType | undefined>(
  undefined
);

// Hook personalizado "useBookContext" para consumir el contexto
export const useCrudBookContext = () => {
  const context = useContext(CrudBookContext);
  if (!context) {
    throw new Error(
      "useBookDeleteContext debe usarse dentro de un BookProvider"
    );
  }
  return context;
};

// Proporciona un componente de contexto que envuelve a tus componentes
export const CrudBookProvider: React.FC<CrudBookProviderProps> = ({
  children,
}) => {
  const { books, setBooks } = useBookContext();
  const [errorNewBook, setErrorNewBook] = useState(false)
  // obtener el libro que vamos a editar
  const [editarBook, setEditarBook] = useState<Book | null>(null);

  // Agregar Libros
  const newBook = async (bookNew: Book) => {
    try {
        
      const bookNewDb: BookNew = {
        id_book: bookNew.id_book,
        isbn: bookNew.isbn,
        title: bookNew.title,
        authors: bookNew.Authors.map(author => author.name), // Extrae los nombres de los autores
        published_date: bookNew.published_date,
        price: bookNew.price,
        description: bookNew.description,
        image: bookNew.image,
        page_count: bookNew.page_count,
        url: null,
        publisher:"Martin",
        tags: bookNew.Tags.map(tag => tag.name), // Extrae los nombres de las etiquetas
        language: bookNew.Language.language,
      };
      // Insertar en la base de datos
      const response = await axios.post(`${bookscapeback}/books`, bookNewDb);

      const newBookWithId = { ...bookNew, id_book: response.data.newBook.id_book };

      // Agregar el nuevo libro al estado
      const updatedBooks = [...books, newBookWithId];
      
      setBooks(updatedBooks);
  
      // Mostrar alerta de éxito
      Swal.fire("¡Agregado!", "El libro se ha agregado correctamente.", "success");
    } catch (error) {
      console.error("Error al agregar el libro:", error);
      setErrorNewBook(true); 
      
      // Alerta de error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Hubo un error, intenta de nuevo"
      });
    }
  };
  

  // Eliminar Libros
  const deleteBook = async (id_book: number) => {
    try {
      // Lógica para realizar el borrado lógico en la base de datos
     await axios.delete(`${bookscapeback}/books/delete/${id_book}`)
      
      // Recargar la lista de libros después de eliminar
      const bookActualizado = books.filter((book) => book.id_book !== id_book);
      setBooks(bookActualizado);

      // Si se elimina, mostrar alerta
      Swal.fire("Eliminado!", "El libro se eliminó correctamente.", "success");
    } catch (error) {
      console.error("Error al eliminar el libro:", error);
      throw error;
    }
  };

  // editar libros
  const editBooks = async(editBook: Book) => {
      try {
        console.log(`Editar libros ${editBook.title}`);
        const { rating_ave, ...editBookWithoutRating } = editBook;
        console.log(editBookWithoutRating);
        
        // mandar el producto editado a la api
        await axios.put(`${bookscapeback}/books/update/${editBook.id_book}`, editBookWithoutRating)

        const librosEditados = books.map((book) => book.id_book === editBook.id_book ? book = editBook : book );
        
        setBooks(librosEditados);
        Swal.fire("Editado!", "El libro se editó correctamente.", "success");
      } catch (error) {
        console.error("Error al editar el libro:", error);
        throw error;
      }
  }


  const CrudBookContextValue: CrudBookContextType = {
    deleteBook,
    newBook,
    errorNewBook,
    setEditarBook,
    editarBook,
    editBooks,
  };

  return (
    <CrudBookContext.Provider value={CrudBookContextValue}>
      {children}
    </CrudBookContext.Provider>
  );
};
