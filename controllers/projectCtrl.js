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

      res.json({ msg: "Created project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProject: async (req, res) => {
    try {
      const { title } = req.body;

      res.json({ msg: "Updated project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProject: async (req, res) => {
    try {
      res.json({ msg: "Deleted project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = projectCtrl;
