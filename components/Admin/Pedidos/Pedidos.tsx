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
        <h2><img src={pedidos.src} alt="Logo" />Pedidos</h2>  
        <span><input type="search" name="" id=""  className={styles.buscador}/>
        <img src={buscar.src} alt="buscador" /></span>
      </div>
      <div className={styles.subTitulo}><p>Busca y modifica las Ordenes de Pedidos </p>
      <Link href="/"><button className={styles.button} type="submit">Exportar Pedidos</button></Link>
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>Id Pedido</th>
              <th>Usuario</th>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Modifiar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>0001</td>
            <td>Nombres y Apellidos</td>
            <td>$15.000</td>
            <td>08/24/2023</td>
            <td>Pendiente</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>0002</td>
            <td>Nombres y Apellidos</td>
            <td>$38.000</td>
            <td>08/24/2023</td>
            <td>Pagado</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
           
          </tbody>
        </table>
      </div>
      </div>
      
    </Fragment>
  );
};
export default TabPedidos;
