import React, { useState } from "react";
import styles from "./styles.module.css";
import Tabs from "@components/Admin/Tabs";
import Link from "next/link";

// Tabs Components
import TabUsuarios from "@/components/Admin/Usuarios/Usuarios";
import TabLibros from "@/components/Admin/Libros/Libros";
import TabPedidos from "@/components/Admin/Pedidos/Pedidos";
import TabPagos from "@/components/Admin/Pagos/Pagos";
import logo from "../../public/images/BookScapeLogo.png";
import libros from "../../public/images/🦆 icon _categories major_.png";
import usuarios from "../../public/images/🦆 icon _Users icon_.png";
import pedidos from "../../public/images/🦆 icon _square favorites_.png";
import pagos from "../../public/images/🦆 icon _File Invoice with US Dollar_.png";

type TabsType = {
  label: React.ReactNode;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: (<>
            <img src={usuarios.src} alt="Logo" className={styles.icono}/>
            Usuarios
            </>
            ),
    index: 1,
    Component: TabUsuarios,
  },
  {
    label: (<>
      <img src={libros.src} alt="Logo" className={styles.icono}/>
      Libros
      </>
      ),
    index: 2,
    Component: TabLibros,
  },
  {
    label: (<>
      <img src={pedidos.src} alt="Logo" className={styles.icono}/>
      Pedidos
      </>
      ),
    index: 3,
    Component: TabPedidos,

  },
  {
    label: (<>
      <img src={pagos.src} alt="Logo" className={styles.icono}/>
      Pagos
      </>
      ),
    index: 4,
    Component: TabPagos,
   
  }
];

export default function Admin() {
    const [selectedTab, setSelectedTab] = useState<number>(tabs[0].index);
  

    return (
      <div className={styles.contenedor}>
        <div className={styles.liner}>
          <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
        </div>
        <div><h3>Panel de Administrador</h3>
        </div>
        <div className={styles.menu} >
          <Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs}/></div>
        <div>Si tiene alguna duda puede contactar al Desarrollador BookScape</div>
        
        

      </div>
    );
  }