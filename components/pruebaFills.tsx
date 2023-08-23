// Marketplace.tsx
import React, { useState, useEffect } from 'react';
import products from './data'; // Importa la matriz de productos desde el archivo data.ts
import Card from './Card'; // Importa tu componente Card
import Pagination from './pagination'; // Importa el componente Pagination
import styles from './Marketplace.module.css'; // Importa los estilos si estás utilizando módulos de estilo

interface Product {
  id: number;
  title: string;
  authors: string;
  price: number;
  description: string;
  rating: number;
  image: string;
  flag: string;
  currency: string;
  ratingCount: number;
  genre: string[];
  language: string;
  stock: number;
}

interface FilterState {
  price: number;
  language: string;
  category: string;
}

const Marketplace: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    price: 0,
    language: '',
    category: '',
  });

  const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([]);
  const [uniqueGenres, setUniqueGenres] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 10; // Cambia este valor según tus necesidades

  useEffect(() => {
    // Obtener las opciones únicas para los filtros
    const languages = Array.from(new Set(products.map(product => product.language.toLowerCase())));
    const genres = Array.from(new Set(products.flatMap(product => product.genre)));

    setUniqueLanguages(languages);
    setUniqueGenres(genres);
  }, []);

  useEffect(() => {
    // Filtrar productos basados en los filtros seleccionados
    const filtered = products.filter(product => {
      const priceFilter = filters.price === 0 || (filters.price === 999 ? product.price > 50 : product.price <= filters.price);
      const languageFilter = filters.language === '' || product.language.toLowerCase() === filters.language.toLowerCase();
      const categoryFilter = filters.category === '' || product.genre.includes(filters.category);
      
      return priceFilter && languageFilter && categoryFilter;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reinicia la página actual al aplicar nuevos filtros
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h1>Marketplace</h1>

      {/* Filtros por precio, idioma y género */}
      {/* ... (código de los filtros) */}

      {/* Botón de aplicar filtros */}
      {/* ... (código del botón) */}
      
      {/* Lista de productos filtrados */}
      <div className={styles.productsContainer}>
        {currentProducts.map(product => (
          <Card
            key={product.id}
            id={product.id}
            title={product.title}
            authors={product.authors}
            price={product.price}
            image={product.image}
            ratingCount={product.ratingCount}
          />
        ))}
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default Marketplace;


// solo los filtros sin paginacion


// import React, { useState, useEffect } from 'react';
// import products from './data'; // Importa la matriz de productos desde el archivo data.ts
// import Card from './Card'; // Importa tu componente Card
// import styles from './Marketplace.module.css'; // Importa los estilos si estás utilizando módulos de estilo

// interface Product {
//   id: number;
//   title: string;
//   authors: string;
//   price: number;
//   description: string;
//   rating: number;
//   image: string;
//   flag: string;
//   currency: string;
//   ratingCount: number;
//   genre: string[];
//   language: string;
//   stock: number;
// }

// interface FilterState {
//   price: number;
//   language: string;
//   category: string;
// }

// const Marketplace: React.FC = () => {
//   const [filters, setFilters] = useState<FilterState>({
//     price: 0,
//     language: '',
//     category: '',
//   });

//   const [uniqueLanguages, setUniqueLanguages] = useState<string[]>([]);
//   const [uniqueGenres, setUniqueGenres] = useState<string[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     // Obtener las opciones únicas para los filtros
//     const languages = Array.from(new Set(products.map(product => product.language.toLowerCase())));
//     const genres = Array.from(new Set(products.flatMap(product => product.genre)));

//     setUniqueLanguages(languages);
//     setUniqueGenres(genres);
//   }, []);

//   useEffect(() => {
//     // Filtrar productos basados en los filtros seleccionados
//     const filtered = products.filter(product => {
//       const priceFilter = filters.price === 0 || (filters.price === 999 ? product.price > 50 : product.price <= filters.price);
//       const languageFilter = filters.language === '' || product.language.toLowerCase() === filters.language.toLowerCase();
//       const categoryFilter = filters.category === '' || product.genre.includes(filters.category);
      
//       return priceFilter && languageFilter && categoryFilter;
//     });

//     setFilteredProducts(filtered);
//   }, [filters]);

//   return (
//     <div>
//       <h1>Marketplace</h1>
      
//       {/* Filtros por precio */}
//       <select
//         value={filters.price}
//         onChange={(e) => setFilters({ ...filters, price: Number(e.target.value) })}
//       >
//         <option value={0}>Cualquier Precio</option>
//         <option value={10}>$1 - $10</option>
//         <option value={20}>$11 - $20</option>
//         <option value={50}>$21 - $50</option>
//         <option value={999}>Más de $50</option>
//       </select>

//       {/* Filtros por idioma */}
//       <select
//         value={filters.language}
//         onChange={(e) => setFilters({ ...filters, language: e.target.value })}
//       >
//         <option value="">Todos los idiomas</option>
//         {uniqueLanguages.map(language => (
//           <option key={language} value={language}>{language}</option>
//         ))}
//       </select>

//       {/* Filtros por género */}
//       <select
//         value={filters.category}
//         onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//       >
//         <option value="">Todos los géneros</option>
//         {uniqueGenres.map(genre => (
//           <option key={genre} value={genre}>{genre}</option>
//         ))}
//       </select>

//       {/* Botón de aplicar filtros */}
//       <button onClick={() => setFilteredProducts(filteredProducts)}>Aplicar Filtros</button>
      
//       {/* Lista de productos filtrados */}
//       <div className={styles.productsContainer}>
//         {filteredProducts.map(product => (
//           <Card
//             key={product.id}
//             id={product.id}
//             title={product.title}
//             authors={product.authors}
//             price={product.price}
//             image={product.image}
//             ratingCount={product.ratingCount}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Marketplace;
