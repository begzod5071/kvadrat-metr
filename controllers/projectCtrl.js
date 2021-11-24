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
      res.json({ msg: "Created project" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = projectCtrl;
