// _document.tsx es un componente especial que se utiliza para personalizar el documento HTML que se envía al navegador. A diferencia de los archivos de página regulares (como `index.js` o `about.js`), `_document.js` se ejecuta en el servidor, no en el navegador del usuario, y se utiliza para agregar elementos de nivel superior al documento HTML, como etiquetas `html`, `head` y `body`.
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/** Etiquetas meta, enlaces a hojas de estilo y otros elementos de cabecera */}
          {/** Se ejecuta en el servidor y se agrega al encabezado del documento HTML */}

          {/** Favicon */}
          {/** Enlace al ícono del sitio que se muestra en la pestaña del navegador */}

          {/** WebFont */}
          {/** Enlace a fuentes web para personalizar la tipografía de la aplicación */}

          {/** Hojas de estilo */}
          {/** Enlaces a hojas de estilo globales que se aplicarán a todas las páginas */}

          {/** Scripts */}
          {/** Enlaces a scripts externos, como seguimiento de análisis o chat en vivo */}
        </Head>
        <body className="my-body-class">
          {/** Clase de cuerpo personalizada */}
          {/** Se agrega una clase al cuerpo del documento HTML */}

          <Main />
          {/** Componente Main */}
          {/** Contiene el contenido principal de la página actual */}

          <NextScript />
          {/** Componente NextScript */}
          {/** Contiene los scripts necesarios para el funcionamiento de Next.js */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
