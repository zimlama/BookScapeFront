import React, { useState, useEffect } from "react";
import { useBookContext } from "@/context/BookContext";
import styles from "./BookSlider.module.css";
import Rating from "../Rating/Rating";
import { useAuthContext } from "@/context/AuthContext";
import promo from "../../public/images/promo.png";
import Link from "next/link";

const BooksSlider: React.FC = () => {
  const { user, isAuthenticated, rutaLogin } = useAuthContext();
  const { books } = useBookContext();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Ordena los libros por calificación promedio en orden descendente
  const sortedBooks = [...books].sort((a, b) => b.rating_ave - a.rating_ave);
  const topRatedBooks = sortedBooks.slice(0, 10);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    const startInterval = () => {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedBooks.length);
      }, 3500); // Cambiar cada 10 segundos
    };

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
      }
    };

    startInterval();

    return () => {
      stopInterval();
    };
  }, [topRatedBooks.length]);

  const goToNextBook = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % topRatedBooks.length);
  };

  const goToPreviousBook = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? topRatedBooks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.topratedbooksslider}>
      <div className={styles.slider}>
        {topRatedBooks
          .slice(currentIndex, currentIndex + 5)
          .map((book, index) => (
            <div
              key={book.id_book}
              className={`${styles.slideritem} ${
                index === 0 ? styles.active : ""
              }`}
            >
              <div className={styles.contenedor}>
                <div className={styles.izq}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className={styles.image}
                  />
                </div>
                <div className={styles.der}>
                  <h3>{book.title}</h3>
                  <Rating rating_ave={book.rating_ave} />
                  {book.Authors.map((obj: any, index: any) => (
                    <div key={index}>{obj.name}</div>
                  ))}
                  <p>Calificación Promedio: {book.rating_ave}</p>
                  <div>
                    {isAuthenticated() && user ? (
                      <></>
                    ) : (
                      <Link href={"/login"}>
                        <button
                          className={styles.button}
                          type="button"
                          onClick={() => rutaLogin("http://mpago.li/2NZfEab")}
                        >
                          Comprar
                        </button>
                        <br />
                      </Link>
                    )}
                  </div>
                </div>
                <div className={styles.promo}>
                  <img src={promo.src} alt="Promocion" />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.sliderButtons}>
        <button
          className={styles.sliderButton}
          onClick={goToPreviousBook}
          disabled={currentIndex === 0}
        >
          &lt;
        </button>
        <button
          className={styles.sliderButton}
          onClick={goToNextBook}
          disabled={currentIndex === topRatedBooks.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default BooksSlider;
