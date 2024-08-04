import { NextFunction, Request, Response } from "express";
import { renameFile } from "../../middlewares/multer.ts";

interface IFiles {
  mainFile: Express.Multer.File[];
  portfolio: Express.Multer.File[];
}

export const uploading = (req: Request, res: Response, next: NextFunction) => {
  const u: unknown = req.files;
  const files = u as IFiles;

  const mainFileLink = files.mainFile?.map(file => renameFile(file));
  const portfolioLink = files.portfolio?.map(file => renameFile(file));

  req.body.mainFileLink = mainFileLink?.at(0)
  req.body.portfolioLink = portfolioLink;

  next()
}