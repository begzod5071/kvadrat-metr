import mongoose from "mongoose";
import { IProject } from "../config/interfaces";

const projectSchema = new mongoose.Schema(
  {
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Developer",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    floor: {
      from: {
        type: Number,
        default: 1,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    bathroom: {
      from: {
        type: Number,
        default: 1,
      },
      to: {
        type: Number,
      },
    },
    area: {
      from: {
        type: Number,
        default: 10,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    rooms: {
      from: {
        type: Number,
        default: 1,
      },
      to: {
        type: Number,
        required: true,
      },
    },
    repair: {
      type: Boolean,
      default: false,
    },
    parking: {
      type: Boolean,
      default: false,
    },
    characters: {
      elevator: {
        type: Boolean,
        default: false,
      },
      workzone: {
        type: Boolean,
        default: false,
      },
      terrace: {
        type: Boolean,
        default: false,
      },
      kindergarden: {
        type: Boolean,
        default: false,
      },
      wifi: {
        type: Boolean,
        default: false,
      },
      bedroom: {
        type: Boolean,
        default: false,
      },
      supermarket: {
        type: Boolean,
        default: false,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      panoramicWindow: {
        type: Boolean,
        default: false,
      },
      restaurant: {
        type: Boolean,
        default: false,
      },
      security: {
        type: Boolean,
        default: false,
      },
      playground: {
        type: Boolean,
        default: false,
      },
    },
    click: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    year: {
      type: Number,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        required: true,
      },
      map: Array,
      district: {
        type: String,
        required: true,
      },
    },
    images: {
      type: [
        {
          url: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
    info: {
      uz: {
        type: String,
        required: true,
      },
      ru: {
        type: String,
        default: null,
      },
      en: {
        type: String,
        default: null,
      },
    },
    apartments: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Projects", projectSchema);
