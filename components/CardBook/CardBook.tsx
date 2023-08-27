import React from "react";
import styles from "./CardBook.module.css";
import Link from "next/link";
import Rating from "../Rating/Rating";
import { CldImage } from 'next-cloudinary';

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
          </div>{" "}
          </Link>
          <div className={styles.cardContent}>
            <p className={styles.title}>{title}</p>
            <p className={styles.cardAuthors}>{Authors.map((obj:any, index:any) => (
           <span key={index}>{obj.name}</span>
              ))}</p>
            <h3 className={styles.cardPrice}>${price}</h3>
          </div>
        
    </div>
  );
};

export default CardBook;
