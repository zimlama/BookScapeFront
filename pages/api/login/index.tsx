import { useUsuarioContext } from "@/context/UsuarioCrudContext";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "../../../db/user";

const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex"); // Genera una clave de 256 bits (32 bytes)
};

const secretKey = generateSecretKey();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Buscar el usuario en la base de datos simulada
    const usuario = getUsers().find(
      (u) => u.email === email && u.password === password
    );

    // Simulación de autenticación exitosa
    if (usuario) {
      // Simulación de autenticación exitosa
      const token = jwt.sign({ userId: usuario.id }, secretKey, {
        expiresIn: "1h", // Ejemplo: el token expira en 1 hora
      });
      return res.status(200).json({ token });
    }

    // Autenticación fallida
    return res.status(401).json({ message: "Credenciales incorrectas" });
  } else {
    return res.status(405).json({ message: "Método no permitido" });
  }
}
