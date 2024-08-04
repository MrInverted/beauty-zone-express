import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel.ts";

interface IVerify {
  token: string;
}

export const verify = async (req: Request<{}, {}, IVerify>, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(404).json({ err: "Токен отсутсвует" });

    let isValid;

    try {
      isValid = jwt.verify(token, "jwt-secret-key");
    } catch (error) {
      return res.status(404).json({ err: "Неверный токен" });
    }

    const isUserExist = await UserModel.findById(isValid);

    if (!isUserExist) return res.status(404).json({ err: "Такой пользователь не существует" });

    return res.json({ success: true, token, id: isValid, info: isUserExist });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}