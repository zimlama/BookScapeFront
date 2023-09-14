import React, { useState } from "react";
import styles from "./Filters.module.css";
import { useFilterContext } from "@/context/FilterContext";
import Link from "next/link";
import { useBookContext } from '@/context/BookContext';

type LanguageType = {
  [key: string]: string;
};

const Filtros: React.FC = () => {
  const {
    filters,
    setFilters,
    uniqueLanguages,
    uniqueTags,
    uniqueAuthors,
    applyFilters,
    setBooksFilters,
    booksFilters,
    aplyFilters,
    setAplyFilters,
  } = useFilterContext();

  const {books} = useBookContext();

  const [showAllTags, setShowAllTags] = useState(false);
  const [showAllAuthors, setShowAllAuthors] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  const toggleShowLessTags = () => {
    setShowAllTags(false);
  };

  const toggleShowAllAuthors = () => {
    setShowAllAuthors(!showAllAuthors);
  };

  const toggleShowLessAuthors = () => {
    setShowAllAuthors(false);
  };

  const languageNames: LanguageType = {
    en: "Inglés",
    es: "Español",
    fr: "Francés",
    de: "Alemán",
  };

  const resetAllFilters = () => {
    setFilters({
      price: 50,
      language: "",
      selectedTags: [],
      selectedAuthors: [],
      rating_ave: 0,
    });
    
    setBooksFilters(books)
    setResetFilters(true);
    setAplyFilters(false);
  };
  
  return (
    <div className={styles.container}>
      {/* Filtros por precio */}
      <label style={{ fontWeight: "bold" }}>Precio</label>
      <br />0{" "}
      <input
        value={filters.price}
        type="range"
        id="filters.price"
        name="filters.price"
        min="0"
        max="50"
        onChange={(e) =>
          setFilters({ ...filters, price: Number(e.target.value) })
        }
      />
      <span>{filters.price}</span>
      <br />
      <br />
      {/* Filtros por idioma */}
      <label style={{ fontWeight: "bold" }}>Idioma</label>
      <select
        className={styles.input}
        value={filters.language}
        id="filters.language"
        name="filters.language"
        onChange={(e) => setFilters({ ...filters, language: e.target.value })}
      >
        <option value="">Todos los idiomas</option>
        {uniqueLanguages.map((language, index) => (
          <option key={index} value={language}>
            {languageNames[language]}
          </option>
        ))}
      </select>
      <br />
      <br />
      {/* Filtros por tags */}
      <label style={{ fontWeight: "bold" }}>Genero</label>
      {showAllTags ? (
        uniqueTags.map((tag) => (
          <div key={tag}>
            <label>
              <input
                type="checkbox"
                value={tag}
                checked={filters.selectedTags.includes(tag)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      selectedTags: [...filters.selectedTags, tag],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      selectedTags: filters.selectedTags.filter(
                        (selectedTag) => selectedTag !== tag
                      ),
                    });
                  }
                }}
              />
              {tag}
            </label>
            <br />
          </div>
        ))
      ) : (
        <>
          {uniqueTags
            .slice(0, 5)
            .sort()
            .map((tag) => (
              <div key={tag}>
                <label>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={filters.selectedTags.includes(tag)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          selectedTags: [...filters.selectedTags, tag],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          selectedTags: filters.selectedTags.filter(
                            (selectedTag) => selectedTag !== tag
                          ),
                        });
                      }
                    }}
                  />
                  {tag}
                </label>
                <br />
              </div>
            ))}
          <button onClick={toggleShowAllTags}>Ver más</button>
          <br />
        </>
      )}
      {showAllTags && (
        <>
          <button onClick={toggleShowLessTags}>Ver menos</button>
          <br />
        </>
      )}
      <br />
      {/* Filtros por authors */}
      <label style={{ fontWeight: "bold" }}>Autor</label>
      {showAllAuthors ? (
        uniqueAuthors.map((author) => (
          <div key={author}>
            <label>
              <input
                type="checkbox"
                value={author}
                checked={filters.selectedAuthors.includes(author)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      selectedAuthors: [...filters.selectedAuthors, author],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      selectedAuthors: filters.selectedAuthors.filter(
                        (selectedAuthor) => selectedAuthor !== author
                      ),
                    });
                  }
                }}
              />
              {author}
            </label>
            <br />
          </div>
        ))
      ) : (
        <>
          {uniqueAuthors.slice(0, 5).map((author) => (
            <div key={author}>
              <label>
                <input
                  type="checkbox"
                  value={author}
                  checked={filters.selectedAuthors.includes(author)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        selectedAuthors: [...filters.selectedAuthors, author],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        selectedAuthors: filters.selectedAuthors.filter(
                          (selectedAuthor) => selectedAuthor !== author
                        ),
                      });
                    }
                  }}
                />
                {author}
              </label>
              <br />
            </div>
          ))}
          <button onClick={toggleShowAllAuthors}>Ver más</button>
          <br />
        </>
      )}
      {showAllAuthors && (
        <>
          <button onClick={toggleShowLessAuthors}>Ver menos</button>
          <br />
        </>
      )}
      <br />
      {/* estrellas */}
      <label style={{ fontWeight: "bold" }}>Más valorados</label>
      {[5, 4, 3, 2, 1].map((rating) => (
        <div key={rating} className={styles.ratingOption}>
          <label>
            <input
              type="checkbox"
              value={rating}
              checked={filters.rating_ave === rating}
              onChange={(e) => {
                if (e.target.checked) {
                  // Deseleccionar la reseña
                  setFilters({ ...filters, rating_ave: Number(rating) });
                } else {
                  // Seleccionar la reseña
                  setFilters({
                    ...filters,
                    rating_ave: 0, // Establecer el valor de la reseña seleccionada
                  });
                }
              }}
            />
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={index < rating ? styles.starFilled : styles.star}
              >
                ★
              </span>
            ))}{" "}
            o más
          </label>
          <br />
        </div>
      ))}
      {/* Botón de aplicar filtros */}
      <br />
      <div className={styles.buttonContainer}>
        <Link href="/filtrar">
          <button className={styles.button} onClick={applyFilters}>
            Aplicar Filtros
          </button>
        </Link>
        <Link href="/">
          <button className={styles.button} onClick={resetAllFilters}>
            Restablecer Filtros
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Filtros;
