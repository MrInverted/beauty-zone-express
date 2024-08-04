import mongoose from "mongoose";

export interface IArticleModel {
  service: string;
  description: string;
  mainFileLink: string;
  priceMin: number;
  priceMax: number;
  phoneNumber: string;
  workingDays: string;
  workingHours: string;

  services: [string, string][];
  portfolioLink: string[];
  ownerId: string | any;

  rating: number;
  viewsCount: number;
  isPremium: boolean;
}

const articleSchema = new mongoose.Schema<IArticleModel>({
  service: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  description: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  mainFileLink: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  priceMin: { type: mongoose.SchemaTypes.Number, required: true, trim: true },
  priceMax: { type: mongoose.SchemaTypes.Number, required: true, trim: true },
  phoneNumber: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  workingDays: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  workingHours: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  services: { type: mongoose.SchemaTypes.Mixed, required: true, trim: true },
  portfolioLink: { type: mongoose.SchemaTypes.Mixed, required: true, trim: true },
  ownerId: { type: mongoose.SchemaTypes.String, required: true, trim: true, ref: "user", },
  rating: { type: mongoose.SchemaTypes.Number, default: 0 },
  viewsCount: { type: mongoose.SchemaTypes.Number, default: 0 },
  isPremium: { type: mongoose.SchemaTypes.Boolean, default: false }
}, { timestamps: true })

const ArticleModel = mongoose.model<IArticleModel>("article", articleSchema);

export { ArticleModel }