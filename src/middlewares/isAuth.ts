import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel.ts";

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ").at(1); // Bearer <token>

    if (!token) return res.status(404).json({ err: "Токен отсутсвует" });

    let isValid;

    try {
      isValid = jwt.verify(token, "jwt-secret-key");
    } catch (error) {
      return res.status(404).json({ err: "Неверный токен" });
    }

    const isUserExist = await UserModel.findById(isValid);

    if (!isUserExist) return res.status(404).json({ err: "Такой пользователь не существует" });

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}