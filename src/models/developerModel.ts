import mongoose from "mongoose";
import { IDeveloper } from "../config/interfaces";

const developerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: Object,
    required: true,
  },
  info: {
    uz: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },
    web: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
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
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      required: true,
      trim: true,
    },
    map: {
      type: String,
      required: true,
      trim: true,
    },
  },
  projects: {
    type: Array,
    default: [],
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model<IDeveloper>("Developers", developerSchema);
