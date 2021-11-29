const Appartment = require("../models/appartmentModel");
const Project = require("../models/projectModel");
const Lead = require("../models/leadModel");

const appartmentCtrl = {
  getAppartments: async (req, res) => {
    try {
      const appartments = await Appartment.find({});

      const newAppartment = await Promise.all(
        appartments.map(async (appartment) => {
          const leads = await Lead.find({ appartmentId: appartment._id });

          appartment.leads = leads;

          return appartment;
        })
      );

      res.json({
        status: "OK",
        length: newAppartment.length,
        appartments: newAppartment,
      });
    } catch (err) {
      return res.error.serverErr(res, err);
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

      res.status(201).json({ message: "Created appartment" });
    } catch (err) {
      return res.error.handleError(res, err);
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
      return res.error.handleError(res, err);
    }
  },
  deleteAppartment: async (req, res) => {
    try {
      const appartment = await Appartment.findById(req.params.id);
      if (!appartment) return res.error.appartmentNotFound(res);

      await Lead.remove({ appartmentId: appartment._id }, { $multi: true });

      await Appartment.findByIdAndDelete(appartment._id);

      res.json({ message: "Appartment deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = appartmentCtrl;
