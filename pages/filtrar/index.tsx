import React, { useState, useEffect } from "react";
import { useFilterContext } from "@/context/FilterContext";
import CardsBooks from "@/components/CardsBooks/CardsBooks";
import styles from "../../styles/Home.module.css";
import BooksSlider from "@/components/BookSlider/BookSlider"
import Pagination from "@/components/Pagination/Pagination";
import Filtros from "@/components/Filters/Filters";

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


const Filtrar: React.FC = () => {

  // Todos los libros
  const { booksFilters } = useFilterContext();
  const itemsPerPage = 10; // Cambia esto al número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = booksFilters.slice(startIndex, endIndex);

  return (
    <div className={styles.description}>
      <div className={styles.descriptionIzq}>
        <h3>Consulta por categorias</h3>
        <Filtros/>  
      </div>
      <div className={styles.descriptionDer}>
        <div>
          {currentBooks.length === 0 ? (
            <div>
              <h3>Sin resultados para este filtro en BookScape.</h3>
            </div>
          ) : (
            <>
              <CardsBooks books={currentBooks} />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(booksFilters.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
        <div>
          <h3 className={styles.h1}>Libro Destacado</h3>
        </div>
        <BooksSlider />
      </div>
    </div>
  );
};

export default Filtrar;
