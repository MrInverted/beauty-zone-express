import express from "express";
import * as article from "./article/index.ts";
import * as request from "./request/index.ts"
import * as auth from "./auth/index.ts";
import { isAuth } from "../middlewares/isAuth.ts";

const accountRouter = express.Router();

accountRouter.get("/article/:ownerId", article.byOwnerId);
accountRouter.get("/request/:ownerId", request.byOwnerId);
accountRouter.patch("/personal/info", isAuth, auth.changeInfo);
accountRouter.patch("/personal/password", isAuth, auth.changePassword);

export { accountRouter }