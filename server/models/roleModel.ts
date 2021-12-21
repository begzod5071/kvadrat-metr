import mongoose from "mongoose";
import { permissions } from "../config/enums";
import { IRole } from "../config/interfaces";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  permissions: {
    type: [
      {
        type: String,
        enum: permissions,
      },
    ],
  },
});

export default mongoose.model<IRole>("Roles", roleSchema);
