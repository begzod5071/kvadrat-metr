const Appartment = require("../models/appartmentModel");
const Project = require("../models/projectModel");

const appartmentCtrl = {
  getAppartment: async (req, res) => {
    try {
      const appartments = await Appartment.find({});

      res.json({ appartments });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  postAppartment: async (req, res) => {
    try {
      const { projectId, room, image, area, bathroom, price } = req.body;

      const project = await Project.findById(projectId);
      if (!project) return res.error.projectNotFound(res);

      if (!image) return res.error.invalidUploadImage(res);

      const newAppartment = new Appartment({
        projectId,
        image,
        room,
        area,
        bathroom,
        price,
      });
      await newAppartment.save();

      res.json({ message: "Created appartment" });
    } catch (err) {
      return res.error.handleError(res);
    }
  },
  updateAppartment: async (req, res) => {
    try {
      const appartmentId = req.params.id;

      const appartment = await Appartment.findByIdAndUpdate(
        appartmentId,
        req.body
      );
      if (!appartment) return res.error.appartmentNotFound(res);

      res.json({
        message: "appartment updated",
      });
    } catch (err) {
      return res.error.handleError(res);
    }
  },
  deleteAppartment: async (req, res) => {
    try {
      const appartmentId = req.params.id;

      const appartment = await Appartment.findByIdAndDelete(appartmentId);
      if (!appartment) return res.error.appartmentNotFound(res);
      res.json({
        message: "appartment deleted",
      });
    } catch (err) {
      return res.error.handleError(res);
    }
  },
};

module.exports = appartmentCtrl;
