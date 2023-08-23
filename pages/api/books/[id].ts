import { NextApiRequest, NextApiResponse } from "next";
import { books } from "../../../db/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica si el método de solicitud es GET
  if (req.method === "GET") {
    try {
      // Obtiene el parámetro de la consulta "id" y lo convierte en un número entero
      const { id } = req.query;
      const bookId = parseInt(id as string, 10);

      // Verifica si el bookId es un número válido
      if (!isNaN(bookId)) {
        // Busca el libro en el array de libros
        const book = books.find((book) => book.id === bookId);

        // Si se encuentra el libro, responde con estado 200 y el libro en formato JSON
        if (book) {
          res.status(200).json(book);
        } else {
          // Si no se encuentra el libro, responde con estado 404 y un mensaje de error
          res.status(404).json({ message: "Book not found" });
        }
      } else {
        // Si el bookId no es un número válido, responde con estado 400 y un mensaje de error
        res.status(400).json({ message: "Invalid book ID" });
      }
    } catch (error) {
      // Si ocurre un error, responde con estado 500 y un mensaje de error genérico
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Si el método de solicitud no es GET, responde con estado 405 y un mensaje de error
    res.status(405).json({ message: "Method not allowed" });
  }
}
