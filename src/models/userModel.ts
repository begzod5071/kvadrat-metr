import mongoose from "mongoose";
import { IUsers } from "../config/interfaces";

const userSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Roles",
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
