import mongoose from "mongoose";
import { ILead } from "../config/interfaces";

const leadSchema = new mongoose.Schema(
  {
    apartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Apartments",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ILead>("Leads", leadSchema);
