import express from 'express';
import * as article from "./article/index.ts";

import { isAuth } from './../middlewares/isAuth.ts';
import { multerWithFields } from '../middlewares/multer.ts';

const articleRouter = express.Router();

articleRouter.get("/", article.getWithSorting);
articleRouter.get("/premium", article.onlyPremium);
articleRouter.get("/limited", article.allAndLimited);
articleRouter.get("/:articleId", article.getOne);

articleRouter.post("/", isAuth, multerWithFields, article.uploading, article.create);
articleRouter.put("/:articleId", isAuth, multerWithFields, article.uploading, article.update);
articleRouter.delete("/:articleId", isAuth, article.deleteById);

export { articleRouter } 