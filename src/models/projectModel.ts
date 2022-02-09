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
      },
    },
    rooms: {
      from: {
        type: Number,
        default: 1,
      },
      to: {
        type: Number,
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
    },
    location: {
      address: {
        type: String,
      },
      landmark: {
        type: String,
      },
      map: Array,
      district: {
        type: String,
      },
    },
    logoProject: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
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
        default: null,
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Projects", projectSchema);
