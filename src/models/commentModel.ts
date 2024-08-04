import mongoose from "mongoose";

export interface ICommentModel {
  name: string;
  email: string;
  text: string;
  imageUrl: string;
  rating: number;
  articleId: string;
}

const commentSchema = new mongoose.Schema<ICommentModel>({
  name: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  email: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  text: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  imageUrl: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  rating: { type: mongoose.SchemaTypes.Number, required: true, default: 0 },
  articleId: { type: mongoose.SchemaTypes.String, required: true, trim: true, ref: "article" },
}, { timestamps: true })

const CommentModel = mongoose.model<ICommentModel>("comment", commentSchema);

export { CommentModel }