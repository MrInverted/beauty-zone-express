import { Request, Response } from "express";
import { CommentModel, ICommentModel } from "../../models/commentModel.ts";

export const create = async (req: Request<{}, {}, ICommentModel>, res: Response) => {
  const { name, email, text, imageUrl, articleId, rating } = req.body;
  const isAllFields = { name, email, text, imageUrl, articleId, rating };

  const fieldsAreMissed = Object.entries(isAllFields).reduce<string[]>((accum, [key, value]) => {
    if (!value) accum.push(key);
    return accum;
  }, [])

  if (fieldsAreMissed.length) return res.status(400).json({ err: `Поля ${fieldsAreMissed.join(", ")} не указаны` });

  try {
    const commentToDb = await CommentModel.create(req.body);

    const comment = await commentToDb.populate("articleId");

    res.json({ success: true, comment });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}