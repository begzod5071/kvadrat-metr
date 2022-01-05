import mongoose from "mongoose";
import { IUsers } from "../config/interfaces";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUsers>("Users", userSchema);
