import React, { useState } from "react";
import styles from "./styles.module.css";
import Tabs from "@components/Admin/Tabs";
import Link from "next/link";

// Tabs Components
import TabUsuarios from "@/components/Admin/Usuarios";
import TabLibros from "@/components/Admin/Libros";
import TabPedidos from "@/components/Admin/Pedidos";
import logo from "../../public/images/BookScapeLogo.png";


type TabsType = {
  label: string;
  index: number;
  Component: React.FC<{}>;
}[];

// Tabs Array
const tabs: TabsType = [
  {
    label: "Usuarios",
    index: 1,
    Component: TabUsuarios
  },
  {
    label: "Libros",
    index: 2,
    Component: TabLibros
  },
  {
    label: "Pedidos",
    index: 3,
    Component: TabPedidos
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
        <div className={styles.liner}> Bienvenido:  aqui puede editar sus preferencias
</div>
        <div className={styles.menu} ><Tabs selectedTab={selectedTab} onClick={setSelectedTab} tabs={tabs} /></div>
        <div></div>
        
        

      </div>
    );
  }