import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";

export const deleteById = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  const token = req.headers.authorization?.split(" ").at(1) as string;
  const ownerIdFromToken = jwt.decode(token) as string;

  try {
    const article = await ArticleModel.findById(articleId);

    if (!article) return res.status(400).json({ err: "По данному id ничего не найдено" });
    if (ownerIdFromToken !== article?.ownerId) return res.status(400).json({ err: "Id с токена не совпадают с id владельца" });

    await article.deleteOne();

    return res.json({ success: "Успешно удалено" })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}