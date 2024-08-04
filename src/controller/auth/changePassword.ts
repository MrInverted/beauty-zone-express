import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import { Request, Response } from "express";
import { UserModel } from '../../models/userModel.ts';

interface IRequest {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeated: string;
}

export const changePassword = async (req: Request<{}, {}, IRequest>, res: Response) => {
  const token = req.headers.authorization?.split(" ").at(1) as string;
  const { oldPassword, newPassword, newPasswordRepeated } = req.body;

  try {
    const id = jwt.decode(token) as string;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ err: "Пользователь не найден" });

    const isPassword = bcrypt.compareSync(oldPassword, user.password);

    if (!isPassword) return res.status(404).json({ err: "Неверный старый пароль" });

    if (newPassword !== newPasswordRepeated) return res.status(404).json({ err: "Новые пароль не совпадают" });

    const hashPassword = bcrypt.hashSync(newPassword, 8);

    user.password = hashPassword;

    return res.json({ success: "Пароль успешно изменен", user });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}