import { Request, Response } from "express";
import { ArticleModel } from "../../models/articleModel.ts";
import { CommentModel } from "../../models/commentModel.ts";

export const getOne = async (req: Request, res: Response) => {
  const { articleId } = req.params;

  try {
    const article = await ArticleModel.findById(articleId).populate("ownerId");

    if (!article) return res.status(400).json({ err: "Карточка объявления не найдена" })

    if (!article.viewsCount) article.viewsCount = 0;

    article.viewsCount += 1;

    const comments = await CommentModel.find({ articleId });

    const ratingTotalFromAll = comments.reduce((accum, item) => accum + item.rating, 0);
    const rating = Math.round(ratingTotalFromAll / comments.length);

    article.rating = rating || 0;

    await article.save();

    return res.json({ success: "Количество просмотров увеличено", article, comments })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}