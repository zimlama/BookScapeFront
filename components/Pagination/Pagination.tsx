// pagination.tsx
import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.container__pagination}>
      {currentPage > 1 && (
      <button
        className={styles.button__pagination}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt; {/* Flecha hacia la izquierda */}
      </button>
      )}
      {pages.map((page) => (
        <button
          className={`${styles.button__pagination} ${
            page === currentPage ? styles.b__active : ''
          }`}
          key={page}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
       {currentPage < totalPages && (

      <button
        className={styles.button__pagination}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt; {/* Flecha hacia la derecha */}
      </button>
       )}
    </div>
  );
};

export default Pagination;
