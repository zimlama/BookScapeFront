import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from "next/router";
import { useFilterContext } from "@/context/FilterContext";

function SearchBar() {

  const router = useRouter();
  const { aplyFilters, guardarBusqueda, busqueda } = useFilterContext();

  const buscarProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (busqueda.trim() === "") {
      if (aplyFilters) {
        router.push({
          pathname: "/filtrar"
        });
      } else {
        router.push({
          pathname: "/",
        });
      }
    } else {
      // redireccionar a /buscar
      router.push({
        pathname: "/buscar",
        query: { q: busqueda },
      });
    }
    // Limpiar el campo de búsqueda
    //  guardarBusqueda("");
  };

  return (
    <div>
      <form className={styles.inputbox} onSubmit={buscarProducto}>
        <input
          type="text"
          placeholder="¿Qué quieres leer hoy?"
          value={busqueda}
          onChange={(e) => guardarBusqueda(e.target.value)}
        />
        <button className={styles.button} type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
