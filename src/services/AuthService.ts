import jwt from "jsonwebtoken";
import { IUsers } from "@/types/IUsers";
import { NextFunction } from "express";

//-------------------------------------------------------------------------------------------------------------------
// Este archivo contiene la funcion que genera el jwt firmado con JWT_SECRET para identificar al usuaio en la api 
//-------------------------------------------------------------------------------------------------------------------


export const generateJwtToken = (user: IUsers) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      provider: user.provider,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );
};

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token requerido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next(); // 🔹 pasa al siguiente paso: el controlador
  } catch {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
};

