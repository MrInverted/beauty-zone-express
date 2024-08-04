import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import "dotenv/config";
import * as controllers from "./controller/index.ts"
import { uploadsPath } from "./middlewares/multer.ts";

const PORT = process.env.PORT || 4000;
const mongodbUrl = process.env.MONGODB;

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

if (!mongodbUrl) throw new Error("MONGODB .env variable is missed");

mongoose.connect(mongodbUrl)
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server has been started on PORT: ${PORT}`));