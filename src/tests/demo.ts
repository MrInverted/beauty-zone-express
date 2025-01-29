import mongoose from "mongoose";
import { UserModel } from "../models/userModel";

const mongodbUrl = process.env.MONGODB_TEST;

if (!mongodbUrl) throw new Error("MONGODB_TEST .env variable is missed");

export const connectMongoose = async () => {
  await mongoose.connect(mongodbUrl);
}

export const disconnectMongoose = async () => {
  await mongoose.disconnect();
}

export const createDemoUser = async () => {
  let isUser = await UserModel.findOne({ email: "test" });

  if (!isUser) {
    isUser = await UserModel.create({
      name: "test",
      surname: "test",
      email: "test",
      password: "test",
      state: "test",
      city: "test",
      street: "test",
      building: "test",
    })
  }

  return isUser.toJSON();
}