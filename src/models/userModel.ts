import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["basic", "moderator", "admin", "superAdmin"],
    default: "basic",
  },
  permissions: {
    type: [
      {
        type: String,
        enum: ["home", "adminPanel", "dashboardPanel"],
      },
    ],
    default: [],
  },
});

export default mongoose.model("Users", userSchema);
