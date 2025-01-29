import { Request, Response } from "express";
import { UserModel } from "../../models/userModel.ts";
import { sendMail } from '../../utils/mailer.ts';

/**
 * req: {
 *  email: string
 * }
 * 
 * res: {
 *  success: string
 * }
 */

export const recovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ err: "Email отсутствует" });

    const isUser = await UserModel.findOne({ email });

    if (!isUser) return res.status(401).json({ err: "Пользователь с данным email не найден" });

    const activationCode = "123456789";

    /*
      It is better to generate uuidv4(), 
      save it to DB as {code, email/userId}, 
      and then send this code to user, 
      but i chose easier way just for example
     */

    // sendMail(email, JSON.stringify({ activationCode }, null, 2));

    return res.json({ success: "Письмо было отправлено" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}