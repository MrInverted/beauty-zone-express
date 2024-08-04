import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { IUserModel, UserModel } from '../../models/userModel.ts';

export const changeInfo = async (req: Request<{}, {}, IUserModel>, res: Response) => {
  const token = req.headers.authorization?.split(" ").at(1) as string;
  const { name, surname, email, state, city, street, building } = req.body;

  try {
    const id = jwt.decode(token) as string;

    const user = await UserModel.findById(id);

    if (!user) return res.status(404).json({ err: "Пользователь не найден" });

    // const allFields = { name, surname, email, state, city, street, building };
    // Object.entries(allFields).forEach(([key, value]) => user[key] = value);

    if (name) user.name = name;
    if (surname) user.surname = surname;
    if (email) user.email = email;
    if (state) user.state = state;
    if (city) user.city = city;
    if (street) user.building = building;

    await user.save();

    return res.json({ success: "Данные успешно изменены", user });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}
