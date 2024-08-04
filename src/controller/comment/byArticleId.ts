import { Request, Response } from "express";
import { CommentModel } from "../../models/commentModel.ts";

export const byArticleId = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const comments = await CommentModel.find({ articleId });

    return res.json({ success: true, comments })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}