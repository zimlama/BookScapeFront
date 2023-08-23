import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter } from 'next/router';

function SearchBar() {
  const [busqueda, guardarBusqueda] = useState("");
  const router = useRouter();

  const buscarProducto = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (busqueda.trim() === '') {
      router.push({
        pathname: '/',
        query: { q: busqueda }
      });
    } else {
      // redireccionar a /buscar
      router.push({
        pathname: '/buscar',
        query: { q: busqueda }
      });
    }
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
        <button className={styles.button} type="submit">Buscar</button>
      </form>
    </div>
  );
}

export default SearchBar;
