import express from "express";
import cors from "cors"
import "dotenv/config";
import * as controllers from "./controller/index.ts"
import { uploadsPath } from "./middlewares/multer.ts";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(uploadsPath));
app.use(cors());

app.use("/api/auth", controllers.authRouter);
app.use("/api/article", controllers.articleRouter);
app.use("/api/comment", controllers.commentRouter);
app.use("/api/request", controllers.requestRouter);
app.use("/api/account", controllers.accountRouter);

export { app };