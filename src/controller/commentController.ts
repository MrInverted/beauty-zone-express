import express from "express";
import * as comment from "./comment/index.ts";
import { multerComment } from "../middlewares/multer.ts";

const commentRouter = express.Router();

commentRouter.get("/", comment.getAll);
commentRouter.get("/:articleId", comment.byArticleId);
commentRouter.post("/", multerComment, comment.uploading, comment.create);

export { commentRouter }