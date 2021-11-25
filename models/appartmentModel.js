const mongoose = require("mongoose");

const appartmentSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appartments", appartmentSchema);
