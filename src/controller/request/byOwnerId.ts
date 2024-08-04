import { Request, Response } from "express";
import { RequestModel } from "../../models/requestModel.ts";

export const byOwnerId = async (req: Request, res: Response) => {
  const { ownerId } = req.params;

  try {
    const requests = await RequestModel.find({ ownerId }).populate("articleId");

    return res.json({ success: true, requests })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}