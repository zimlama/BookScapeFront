import CardBook from "../CardBook/CardBook";
import styles from "./CardsBooks.module.css";
type Author = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Tags = {
  name: string;
  // Agrega otras propiedades si es necesario
};

type Book = {
  id_book: number;
  title: string;
  Authors: Author[];
  price: number;
  Tags: Tags[];
  image: string;
  rating_ave: number;
};

type CardsBooksProps = {
  books: Book[];
};

const CardsBooks: React.FC<CardsBooksProps> = ({ books }) => {
  return (
    <div className={styles.container}>
      {books.map(({ title, Authors, price, Tags, image, id_book, rating_ave }, index) => (
        <CardBook
          key={index}
          id_book={id_book}
          title={title}
          Authors={Authors}
          price={price}
          Tags={Tags}
          image={image}
          rating_ave={rating_ave}
        />
      ))}
    </div>
  );
};

export default CardsBooks;
