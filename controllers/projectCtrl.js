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
      const { title } = req.body;

      const newProject = new Project({
        title,
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
  createProject: async (req, res) => {
    try {
      const { title } = req.body;

      const newProject = new Project({
        title,
      });
      await newProject.save();

      res.json({ msg: "Created project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = projectCtrl;
