import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { ArticleModel, IArticleModel } from "../../models/articleModel.ts";

interface IArticleModelExtended extends IArticleModel {
  mainFile: string;
  portfolio: (string | File)[];
}

export const update = async (req: Request<{ articleId: string }, {}, IArticleModelExtended>, res: Response) => {
  try {
    const { description, phoneNumber, priceMax, priceMin, service, services, workingDays, workingHours } = req.body;
    const { mainFile, portfolio } = req.body;

    if (typeof mainFile === "string") req.body.mainFileLink = mainFile;
    if (!req.body.portfolioLink) req.body.portfolioLink = [];
    if (portfolio && typeof portfolio === "string") req.body.portfolioLink.push(portfolio);
    if (Array.isArray(portfolio)) portfolio.forEach(item => {
      if (typeof item === "string") req.body.portfolioLink.push(item);
    })

    const isAllFields = {
      mainFileLink: req.body.mainFileLink,
      portfolioLink: req.body.portfolioLink,
      description,
      phoneNumber,
      priceMax,
      priceMin,
      service,
      services,
      workingDays,
      workingHours
    };

    const fieldsAreMissed = Object.entries(isAllFields).reduce<string[]>((accum, [key, value]) => {
      if (!value) accum.push(key);
      return accum;
    }, [])

    if (fieldsAreMissed.length) return res.status(400).json({ err: `Поля ${fieldsAreMissed.join(", ")} не указаны` });

    const token = req.headers.authorization?.split(" ").at(1) as string;

    req.body.ownerId = jwt.decode(token) as string;

    const articleToDb = await ArticleModel.findOneAndUpdate({ _id: req.params.articleId }, { ...req.body }, { new: true });

    const article = await articleToDb?.populate("ownerId");

    return res.json({ success: true, article });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}