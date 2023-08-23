import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
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
  title: string;
  Authors: Author[];
  published_date: number;
  price: number;
  description: string;
  rating_ave: number;
  image: string;
  page_count: number;
  Tags: Tags[];
  Language: string;
};

// Definición del tipo de objeto para el contexto "BookContextType"
type BookContextType = {
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>; 
};

type BookProviderProps = {
  children: React.ReactNode;
};

// Creación del contexto "BookContext" y establecimiento del valor inicial como "undefined"
const BookContext = createContext<BookContextType | undefined>(undefined);

// Hook personalizado "useBookContext" para consumir el contexto
export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext debe usarse dentro de un BookProvider");
  }
  return context;
};

// Componente proveedor "BookProvider" del contexto
export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  // Estado local "books" que almacena la lista de libros
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/books/");
      const booksWithRandomRating = response.data.map((book: Book) => ({
        ...book,
        rating_ave:
          book.rating_ave !== null ? book.rating_ave : (Math.random() * 3 + 4).toFixed(1),
          page_count:
          book.page_count !== null ? book.page_count : (Math.random() * 200).toFixed(0),
      }));
      setBooks(booksWithRandomRating);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Creación del objeto "contextValue" con la información del contexto
  const contextValue: BookContextType = {
    books,
    setBooks,
  };

  // Retorna el componente "BookContext.Provider" que envuelve a los componentes hijos
  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
};
