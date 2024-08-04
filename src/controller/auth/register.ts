import bcrypt from 'bcrypt';
import { Request, Response } from "express";
import { IUserModel, UserModel } from "../../models/userModel.ts";
import { sendMail } from '../../utils/mailer.ts';

export const register = async (req: Request<{}, {}, IUserModel>, res: Response) => {
  try {
    const { name, surname, email, password, state, city, street, building } = req.body;
    const isAllFields = { name, surname, email, password, state, city, street, building };

    const fieldsAreMissed = Object.entries(isAllFields).reduce<string[]>((accum, [key, value]) => {
      if (!value) accum.push(key);
      return accum;
    }, [])

    if (fieldsAreMissed.length) return res.status(400).json({ err: `Поля ${fieldsAreMissed.join(", ")} не указаны` });

    const isAlreadyRegistered = await UserModel.findOne({ email: email });

    if (isAlreadyRegistered) return res.status(400).json({ err: "Аккаунт с таким email уже существует" });

    const hashPassword = bcrypt.hashSync(password, 8);

    const user = await UserModel.create({ ...req.body, password: hashPassword });

    const userWithPassword = { ...user.toObject(), password };

    sendMail(email, JSON.stringify(isAllFields, null, 2));

    return res.status(201).json({ success: "Пользователь успешно зарегистрирован", userWithPassword });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}