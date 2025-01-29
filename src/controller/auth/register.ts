import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../models/userModel.ts";
import { sendMail } from '../../utils/mailer.ts';
import { checkAllFields } from '../../utils/checkAllFields.ts';

/**
 * req: {
 *   name: string
 *   surname: string
 *   email: string
 *   password: string
 *   state: string
 *   city: string
 *   street: string
 *   building: string
 * }
 * 
 * res: {
 *  success: string;
 *  userWithPassword: {
 *   name: string
 *   surname: string
 *   email: string
 *   password: string
 *   state: string
 *   city: string
 *   street: string
 *   building: string
 *   _id: string
 *   }
 * }
 */

export const register = async (req: Request<{}, {}, IUserModel>, res: Response) => {
  try {
    const { name, surname, email, password, state, city, street, building } = req.body;

    const isFieldsMissed = checkAllFields({ name, surname, email, password, state, city, street, building });

    if (isFieldsMissed) return res.status(400).json({ err: isFieldsMissed });

    const isAlreadyRegistered = await UserModel.findOne({ email: email });

    if (isAlreadyRegistered) return res.status(400).json({ err: "Аккаунт с таким email уже существует" });

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await UserModel.create({ ...req.body, password: hashPassword });

    const userWithPassword = { ...user.toObject(), password };

    // sendMail(email, JSON.stringify(isAllFields, null, 2));

    return res.status(201).json({ success: "Пользователь успешно зарегистрирован", userWithPassword });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}