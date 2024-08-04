import mongoose from "mongoose";

export interface IUserModel {
  name: string;
  surname: string;
  email: string;
  password: string;
  state: string;
  city: string;
  street: string;
  building: string;
}

const userSchema = new mongoose.Schema<IUserModel>({
  name: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  surname: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  email: { type: mongoose.SchemaTypes.String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  state: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  city: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  street: { type: mongoose.SchemaTypes.String, required: true, trim: true },
  building: { type: mongoose.SchemaTypes.String, required: true, trim: true },
}, { timestamps: true });

const UserModel = mongoose.model<IUserModel>("user", userSchema);

export { UserModel }