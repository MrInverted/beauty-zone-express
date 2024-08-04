import { Request, Response } from "express";
import { IRequest, RequestModel } from "../../models/requestModel.ts";

export const create = async (req: Request<{}, {}, IRequest>, res: Response) => {
  const { name, phone, text, articleId } = req.body;
  const isAllFields = { name, phone, text, articleId };

  const fieldsAreMissed = Object.entries(isAllFields).reduce<string[]>((accum, [key, value]) => {
    if (!value) accum.push(key);
    return accum;
  }, [])

  if (fieldsAreMissed.length) return res.status(400).json({ err: `Поля ${fieldsAreMissed.join(", ")} не указаны` });

  try {
    const request = await RequestModel.create(req.body);

    return res.json({ success: true, request });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}