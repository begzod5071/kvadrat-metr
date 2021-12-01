import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    appartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Appartments",
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leads", leadSchema);
