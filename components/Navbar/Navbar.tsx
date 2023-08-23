import React from "react";
import Link from "next/link";
import logo from "../../public/images/BookScapeLogo.png";
import styles from "../Navbar/NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { IoIosCart } from "react-icons/io";
import { IoMdPerson, IoLogoWhatsapp } from "react-icons/io";

const Navbar = () => {
  const usuario = false;
  return (
    <nav>
      <div className={styles.liner}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={logo.src} alt="Logo" />
          </Link>
        </div>
        <div className={styles.contanier}>
          <div className={styles.SearchBar}>
            <SearchBar />
          </div>
          {usuario ? (
            <div>
              <p>Hola Grupo</p>
              <button type="button">Cerrar Sesión</button>
            </div>
          ) : (

            <Link href="/carritoDeCompra" className={styles.Iconos}>Carrito <IoIosCart />
            
            </Link>
          )}
            <Link href="/login" className={styles.Text}>Identifícate<IoMdPerson /></Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
