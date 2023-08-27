import React, { FC, Fragment } from "react";
import money from "../../../public/images/🦆 icon _Dollar Sign icon_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";

import Link from "next/link";
import styles from "../styles.module.css"

const TabPagos: FC<{}> = () => {
  return (
    <Fragment>
      <div className={styles.contenedor}>
      <div className={styles.titulo}>
        <h2><img src={money.src} alt="Logo" />Pagos recibidos</h2>  
        <span><input type="search" name="" id=""  className={styles.buscador}/>
        <img src={buscar.src} alt="buscador" /></span>
      </div>
      <div className={styles.subTitulo}><p>Busca y modifica Pagos recibidos </p>
      <div>
      <Link href="/"><button className={styles.button} type="submit">Exportar Pagos</button></Link>
      </div>
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>N. Pedido</th>
              <th>N. Carrito</th>
              <th>Nombres Usuario</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Estado transacción</th>
              <th>Modifiar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>01</td>
            <td>01</td>
            <td>Marian Rojas</td>
            <td>$30.78</td>
            <td>24/08/2023</td>
            <td>Aprobada</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>02</td>
            <td>02</td>
            <td>Roberto Salmona</td>
            <td>$5.07</td>
            <td>24/08/2023</td>
            <td>Recahzada</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
           
          </tbody>
        </table>

      

      </div>
      </div>
      
    </Fragment>
  );
};
export default TabPagos;
