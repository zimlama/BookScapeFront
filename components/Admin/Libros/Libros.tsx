import React, { FC, Fragment } from "react";
import libros from "../../../public/images/🦆 icon _categories major_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import libro1 from "../../../public/images/libro1.jpg"
import libro12 from "../../../public/images/libro12.jpg"
import Link from "next/link";
import styles from "../styles.module.css"

const TabLibros: FC<{}> = () => {
  return (
    <Fragment>
      <div className={styles.contenedor}>
      <div className={styles.titulo}>
        <h2><img src={libros.src} alt="Logo" />Libros</h2>  
        <span><input type="search" name="" id=""  className={styles.buscador}/>
        <img src={buscar.src} alt="buscador" /></span>
      </div>
      <div className={styles.subTitulo}><p>Busca y modifica las Ordenes de Pedidos </p>
      <div><Link href="/"><button className={styles.button} type="submit">Nuevo Libro</button></Link>
      <Link href="/"><button className={styles.button} type="submit">Exportar Libros</button></Link>
      </div>
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>Imagen</th>
              <th>Titulo</th>
              <th>Autor</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Modifiar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td className={styles.libro}><img src={libro1.src} alt="libro1" /></td>
            <td>Encuentra Tu Persona Vitamina</td>
            <td>Marian Rojas</td>
            <td>$30.78</td>
            <td>08/24/2023</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td className={styles.libro}><img src={libro12.src} alt="libro1" /></td>
            <td>Psicología oscura</td>
            <td>Steven Turner</td>
            <td>$4.50</td>
            <td>08/24/2023</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
           
          </tbody>
        </table>

      

      </div>
      </div>
      
    </Fragment>
  );
};
export default TabLibros;
