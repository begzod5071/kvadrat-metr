import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    appartmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    deviceId: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      enum: ["click", "view"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Device", deviceSchema);
