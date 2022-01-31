import mongoose from "mongoose";
import { IDeveloper } from "../config/interfaces";

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    trim: true,
    ref: "Users",
  },
  image: {
    type: Object,
    required: true,
  },
  info: {
    uz: {
      type: String,
      default: null,
      trim: true,
    },
    ru: {
      type: String,
      default: null,
      trim: true,
    },
    en: {
      type: String,
      default: null,
      trim: true,
    },
  },
  contact: {
    phone: {
      type: String,
      trim: true,
    },
    web: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    callCenter: {
      type: String,
      trim: true,
    },
  },
  social: {
    facebook: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    tiktok: {
      type: String,
      trim: true,
    },
    telegram: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
    twitter: {
      type: String,
      trim: true,
    },
  },
  location: {
    address: {
      type: String,
      trim: true,
    },
    landmark: {
      type: String,
      trim: true,
    },
    map: Array,
  },
  projects: {
    type: Array,
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IDeveloper>("Developer", developerSchema);
