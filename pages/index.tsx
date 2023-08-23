import React from "react";
import { useState } from "react";
import CardsBooks from "@/components/CardsBooks/CardsBooks";
import styles from "../styles/Home.module.css";
import { useBookContext } from "@/context/BookContext";
import autor from "../public/images/autor.png";
import Pagination from "@/components/Pagination/Pagination";
import Filtros from "@/components/Filters/Filters";
 

function Home() {
  // Utiliza el hook useBookContext para obtener los datos y funciones del contexto
  const { books } = useBookContext();
  const itemsPerPage = 10; // Cambia esto al número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  return (
    <div className={styles.description}>
      <div className={styles.descriptionIzq}>
        <h5 >Consulta por categorias</h5>
       <Filtros/>       
      </div>
      <div className={styles.descriptionDer}>
        <div>
          <h3 className={styles.h1}>Bienvenidos</h3>
    
          <CardsBooks books={currentBooks} />
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(books.length / itemsPerPage)}
            onPageChange={handlePageChange}
          />
        </div>
        <div>
          <h3 className={styles.h1}>Libro Destacado</h3>
        </div>
        <div className={styles.autor}>
          <img src={autor.src} alt="autor" />
        </div>
      </div>
    </div>
  );
}

export default Home;
