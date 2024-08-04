import mongoose from "mongoose";
import { IArticleModel } from "./articleModel";

export interface IRequest {
  name: string;
  phone: string;
  text: string;
  isChecked: boolean;

  articleId: string;
  ownerId: string;
}

const requestSchema = new mongoose.Schema<IRequest>({
  name: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  phone: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  text: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  isChecked: { type: mongoose.SchemaTypes.Boolean, required: true, default: false },
  articleId: { type: mongoose.SchemaTypes.String, required: true, trim: true, ref: "article" },
  ownerId: { type: mongoose.SchemaTypes.String, required: true, trim: true, ref: "user" }
}, { timestamps: true })

const RequestModel = mongoose.model<IRequest>("request", requestSchema);

export { RequestModel }