import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomNav from "../../components/UserAdmin/CustomNav";
import styles from "./styles.module.css";
import logo from "../../public/images/BookScapeLogo.png";
import Link from "next/link";


export default function UserAdmin() {
  return (
    <div className={styles.contenedor}>
      
      <div className={styles.izq}>
        <div className={styles.logo}>
        <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
      </div>
     <CustomNav
      li={[
        [< Link href="/" className={styles.links}>Escritorio</Link>, "images/dashboard.svg"],
        [< Link href="/" className={styles.links}>Libros</Link>, "images/restaurant.svg"],
        [< Link href="/" className={styles.links}>Mi Perfil</Link>, "images/manage user.svg"],
        [< Link href="/" className={styles.links}>Mis Ordenes</Link>, "images/manage  order.svg"],
        [< Link href="/" className={styles.links}>Reseñar Libros</Link>, "images/manage coupon.svg"],

      ]}
    />
     </div>
      <div className={styles.der}> Bienvenido Usuario: </div>
      
    
    
    </div>


  );
}
