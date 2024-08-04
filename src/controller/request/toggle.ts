import { Request, Response } from "express";
import { RequestModel } from "../../models/requestModel.ts";

export const toggle = async (req: Request, res: Response) => {
  const { requestId } = req.params;

  try {
    const request = await RequestModel.findById(requestId);

    if (!request) return res.status(400).json({ err: "По данному ID запрос не найден" });

    request.isChecked = !request.isChecked;

    await request.save();
    await request.populate("articleId");
    await request.populate("ownerId");

    const requests = await RequestModel.find({ ownerId: request.ownerId })

    return res.json({ success: true, request, requests });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}