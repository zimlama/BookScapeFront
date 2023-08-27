import React, { FC, Fragment } from "react";
import usuarios from "../../../public/images/🦆 icon _Users icon_.png";
import modify from "../../../public/images/🦆 icon _Pen Square_.png";
import del from "../../../public/images/🦆 icon _Times Circle_.png";
import buscar from "../../../public/images/🦆 icon _Search icon_.svg";
import Link from "next/link";
import styles from "../styles.module.css"

const TabUsuarios: FC<{}> = () => {
  return (
    <Fragment>
      <div className={styles.contenedor}>
      <div className={styles.titulo}>
        <h2><img src={usuarios.src} alt="Logo" />Usuarios</h2>  
        <span><input type="search" name="" id=""  className={styles.buscador}/>
        <img src={buscar.src} alt="buscador" /></span>
      </div>
      <div className={styles.subTitulo}><p>Busca y modifica los usuarios </p>
      <Link href="/"><button className={styles.button} type="submit">Exportar Usuarios</button></Link>
      </div>
      <div className={styles.resultados}>
              <div className={styles.titulo}></div>
        <table className={styles.tabla}>  
          <thead>
            <tr>     
              <th><input type="checkbox" name="" id="" />Seleccione</th>
              <th>Usuario</th>
              <th>Email</th>
              <th>Modifiar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Nombres y Apellidos</td>
            <td>Email Usuario</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
            </tr>
            <td><input type="checkbox" name="" id="" /></td>
            <td>Nombres y Apellidos</td>
            <td>Email Usuario</td>
            <td className={styles.selectores}><Link href="/"><img src={modify.src} alt="Modificar" /></Link></td>
            <td className={styles.selectores}><Link href="/"><img src={del.src} alt="Eliminar" /></Link></td>
           
          </tbody>
        </table>

      

      </div>
      </div>
      
      
    </Fragment>
  );
};
export default TabUsuarios;
