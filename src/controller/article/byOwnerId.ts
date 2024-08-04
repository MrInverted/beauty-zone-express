import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";

export const byOwnerId = async (req: Request, res: Response) => {
  const { ownerId } = req.params;

  try {
    const articles = await ArticleModel.find({ ownerId });

    return res.json({ success: true, articles })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}