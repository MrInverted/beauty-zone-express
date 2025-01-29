import mongoose from "mongoose";
import { app } from "./server";

const PORT = process.env.PORT || 4000;
const mongodbUrl = process.env.MONGODB;

if (!mongodbUrl) throw new Error("MONGODB .env variable is missed");

mongoose.connect(mongodbUrl)
  .then(() => app.listen(PORT))
  .then(() => console.log(`Server has been started on PORT: ${PORT}`));