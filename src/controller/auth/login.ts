import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel.ts";
import { checkAllFields } from '../../utils/checkAllFields.ts';

interface ILogin {
  email: string;
  password: string;
}

/**
 * req {
 *   email: string
 *   password: string
 * }
 * 
 * res: {
 *   success: <token>
 *   ownerId: string
 * }
 */

export const login = async (req: Request<{}, {}, ILogin>, res: Response) => {
  try {
    const { email, password } = req.body;

    const isFieldsMissed = checkAllFields({ email, password });

    if (isFieldsMissed) return res.status(400).json({ err: isFieldsMissed });

    const isUser = await UserModel.findOne({ email });

    if (!isUser) return res.status(401).json({ err: "Пользователь с данным email не найден" });

    const isPassword = bcrypt.compareSync(password, isUser.password);

    if (!isPassword) return res.status(401).json({ err: "Неверный пароль" });

    const token = jwt.sign(isUser.id, "jwt-secret-key");

    return res.json({ success: token, ownerId: isUser.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}