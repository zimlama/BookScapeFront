import React from "react";
import styles from "./CardBook.module.css";
import Link from "next/link";
import Rating from "../Rating/Rating";

type Author = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Tags = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type CardBookProps = {
  id_book: number;
  title: string;
  Authors: Author[];
  price: number;
  Tags: Tags[];
  image: string;
  rating_ave: number;
};

const CardBook: React.FC<CardBookProps> = ({
  id_book,
  title,
  Authors,
  price,
  image,
  rating_ave,
}) => {
  return (
    <div className={styles.imageContainer}>
      <Link href={`/book/${id_book}`} className={styles.card}>
        <div>
          <img src={image} alt={title} className={styles.image} />
          <Rating rating_ave={rating_ave} />
          <div className={styles.cardContent}>
            <h6 className={styles.title}>{title}</h6>
            <h4 className={styles.cardAuthors}>{Authors.map((obj:any, index:any) => (
    <div key={index}>{obj.name}</div>
  ))}</h4>
            <h3 className={styles.cardPrice}>${price}</h3>
          </div>
        </div>{" "}
      </Link>
    </div>
  );
};

export default CardBook;
