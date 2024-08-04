import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel.ts";

interface IRequest {
  email: string;
  code: string;
  passwordOne: string;
  passwordTwo: string;
}

export const recoveryChangePassword = async (req: Request<{}, {}, IRequest>, res: Response) => {
  try {
    const { email, passwordOne, passwordTwo, code } = req.body;

    const activationCode = "123456789";

    if (code !== activationCode) return res.status(400).json({ err: "Неверный код активации" });

    if (!passwordOne) return res.status(400).json({ err: "Пароль отсутствует" });

    if (passwordOne !== passwordTwo) return res.status(400).json({ err: "Пароли не совпадают" });

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ err: "Пользователь с данным email не найден" });

    const bcryptedPassword = bcrypt.hashSync(passwordOne, 8);

    user.password = bcryptedPassword;

    await user.save();

    return res.json({ success: "Пароль успешно измененен" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}