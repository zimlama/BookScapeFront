import React, { FC, Fragment } from "react";
import pedidos from "../../../public/images/🦆 icon _square favorites_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css"


const TabPedidos: FC<{}> = () => {
  return (
    <Fragment>
      <div className={styles.contenedor}>
      <div className={styles.titulo}>
        <h2><img src={pedidos.src} alt="Logo" />Mis Pedidos</h2>  
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>Id Pedido</th>
              <th>Libro</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Modificar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>0001</td>
            <td>The Count of Monte Cristo</td>
            <td>$15.000</td>
            <td>08/24/2023</td>
            <td>Pendiente</td>
            <td className={styles.selectores}><Link href="/admin"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/admin"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
     
          </tbody>
        </table>
      </div>
      </div>
      
    </Fragment>
  );
};
export default TabPedidos;
