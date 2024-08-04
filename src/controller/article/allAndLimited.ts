import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";

export const allAndLimited = async (req: Request, res: Response) => {
  try {
    const articles = await ArticleModel.find().limit(12).populate("ownerId");

    return res.json({ success: true, articles })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}