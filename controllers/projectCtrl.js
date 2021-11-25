const Project = require("../models/projectModel");

const projectCtrl = {
  getProjects: async (req, res) => {
    try {
      const projects = await Project.find({});

      res.json({ projects });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProject: async (req, res) => {
    try {
      const {
        name,
        floorFrom,
        floorTo,
        areaFrom,
        areaTo,
        roomsFrom,
        roomsTo,
        repair,
        parking,
        isActive,
        year,
        address,
        landmark,
        map,
        images,
        infoUz,
        infoRu,
        infoEn,
      } = req.body;

      const newProject = new Project({
        name,
        floor: {
          from: floorFrom,
          to: floorTo,
        },
        area: {
          from: areaFrom,
          to: areaTo,
        },
        rooms: {
          from: roomsFrom,
          to: roomsTo,
        },
        repair,
        parking,
        isActive,
        year,
        location: {
          address,
          landmark,
          map,
        },
        images,
        info: {
          uz: infoUz,
          ru: infoRu,
          en: infoEn,
        },
      });
      await newProject.save();

      res.json({ message: "Created project" });
    } catch (err) {
      if (err.name === "ValidationError") return res.status(400).json({ err });

      return res.error.serverErr(res);
    }
  },
  updateProject: async (req, res) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body);
      if (!project) return res.error.projectNotFound(res);

      res.json({ message: "Updated project" });
    } catch (err) {
      if (err.name === "ValidationError") return res.status(400).json({ err });

      return res.error.serverErr(res);
    }
  },
  deleteProject: async (req, res) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) return res.error.projectNotFound(res);

      res.json({ message: "Deleted project" });
    } catch (err) {
      return res.error.serverErr(res);
    }
  },
};

module.exports = projectCtrl;
