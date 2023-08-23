import { NextApiRequest, NextApiResponse } from "next";
import { books } from "../../../db/data";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica si el método de solicitud es GET
  if (req.method === "GET") {
    try {
      // Responde con estado 200 y el array de libros en formato JSON
      res.status(200).json(books);
    } catch (error) {
      // Si ocurre un error, responde con estado 500 y un mensaje de error genérico
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    // Si el método de solicitud no es GET, responde con estado 405 y un mensaje de error
    res.status(405).json({ message: "Method not allowed" });
  }
}
