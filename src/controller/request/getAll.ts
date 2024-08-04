import { Request, Response } from "express";
import { RequestModel } from "../../models/requestModel.ts";

export const getAll = async (req: Request, res: Response) => {
  try {
    const requests = await RequestModel.find();

    return res.json({ success: true, requests });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ err: "Что-то пошло нее так" })
  }
}