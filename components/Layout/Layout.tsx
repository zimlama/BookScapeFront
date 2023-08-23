// Layout es establecer una estructura visual consistente que se repite en todas las páginas para crear una experiencia coherente y agradable para los usuarios.

import React from 'react';
import { Container } from 'semantic-ui-react';

import Footer from '../Footer/Footer';
import Navbar from '@components/Navbar/Navbar';

// Definición de los tipos de propiedades que puede recibir el componente Layout
type LayoutProps = {
  children?: React.ReactNode; // El contenido que se renderizará dentro del layout
};

// Definición del componente Layout utilizando React.FC para indicar que es un componente funcional
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Componente Navbar que se mostrará en la parte superior */}
      <Navbar />

      {/* Contenedor principal con un formato de texto */}
      <Container as="main" text>
        {children} {/* Renderiza el contenido pasado como prop children */}
      </Container>

      {/* Componente Footer que se mostrará en la parte inferior */}
      <Footer />
    </>
  );
};

export default Layout;
