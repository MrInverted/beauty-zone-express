import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ArticleModel, IArticleModel } from "../../models/articleModel.ts";

export const create = async (req: Request<{}, {}, IArticleModel>, res: Response) => {
  const { mainFileLink, portfolioLink, description, phoneNumber, priceMax, priceMin, service, services, workingDays, workingHours } = req.body;
  const isAllFields = { mainFileLink, portfolioLink, description, phoneNumber, priceMax, priceMin, service, services, workingDays, workingHours };

  const fieldsAreMissed = Object.entries(isAllFields).reduce<string[]>((accum, [key, value]) => {
    if (!value) accum.push(key);
    return accum;
  }, [])

  if (fieldsAreMissed.length) return res.status(400).json({ err: `Поля ${fieldsAreMissed.join(", ")} не указаны` });

  const token = req.headers.authorization?.split(" ").at(1) as string;
  req.body.ownerId = jwt.decode(token) as string;

  try {
    const articleToDb = await ArticleModel.create(req.body);

    const article = await articleToDb.populate("ownerId");

    return res.json({ success: true, article });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}