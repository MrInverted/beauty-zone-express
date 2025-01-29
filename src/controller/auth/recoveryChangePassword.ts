import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { UserModel } from "../../models/userModel.ts";
import { checkAllFields } from '../../utils/checkAllFields.ts';

interface IRequest {
  email: string;
  code: string;
  passwordOne: string;
  passwordTwo: string;
}

/**
 * req: {
 *   email: string
 *   code: string
 *   passwordOne: string
 *   passwordTwo: string
 * }
 * 
 * res: {
 *   success: string
 * }
 */

export const recoveryChangePassword = async (req: Request<{}, {}, IRequest>, res: Response) => {
  try {
    const { email, passwordOne, passwordTwo, code } = req.body;

    const isFieldsMissed = checkAllFields({ email, passwordOne, passwordTwo, code });

    if (isFieldsMissed) return res.status(400).json({ err: isFieldsMissed });

    if (passwordOne !== passwordTwo) return res.status(400).json({ err: "Пароли не совпадают" });

    const activationCode = "123456789";

    if (code !== activationCode) return res.status(401).json({ err: "Неверный код активации" });

    const user = await UserModel.findOne({ email });

    if (!user) return res.status(401).json({ err: "Пользователь с данным email не найден" });

    const bcryptedPassword = bcrypt.hashSync(passwordOne, 8);

    user.password = bcryptedPassword;

    await user.save();

    return res.json({ success: "Пароль успешно измененен" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}