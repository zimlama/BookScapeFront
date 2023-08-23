import React from "react";
import styles from "./Rating.module.css";

type RatingProps = {
  rating_ave: number; // Valor original del rating_ave de la base de datos
};

const Rating: React.FC<RatingProps> = ({ rating_ave }) => {
  const maxStars = 5;
  const roundedRating = Math.round(rating_ave); // Redondear el rating_ave al número entero más cercano

  return (
    <div className={styles.rating}>
      {Array.from({ length: maxStars }).map((_, index) => (
        <span
          key={index}
          className={index < roundedRating ? styles.starFilled : styles.star}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
