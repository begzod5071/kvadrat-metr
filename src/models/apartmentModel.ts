import mongoose from "mongoose";
import { IApartment } from "../config/interfaces";

const apartmentSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Projects",
    },
    image: {
      type: Object,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    click: {
      type: Number,
      default: 0,
    },
    view: {
      type: Number,
      default: 0,
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

export default mongoose.model("Apartments", apartmentSchema);
