import { NextFunction, Request, Response } from "express";
import { renameFile } from "../../middlewares/multer.ts";

export const uploading = (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;

  const imageUrl = renameFile(file);

  req.body.imageUrl = imageUrl;

  next();
}