import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";

export const onlyPremium = async (req: Request, res: Response) => {
  try {
    const articles = await ArticleModel.find({ isPremium: true }).populate("ownerId");

    return res.json({ success: true, articles })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}