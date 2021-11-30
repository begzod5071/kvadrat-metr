const Developer = require("../models/developerModel");
const Project = require("../models/projectModel");
const Appartment = require("../models/appartmentModel");
const Lead = require("../models/leadModel");

const filterCtrl = {
  getFilter: async (req, res) => {
    try {
      const { district, room, develover, priceFrom, priceTo } = req.params;

      const projects = await Project.find(
        !district ? {} : { location: { region: district } }
      );

      await Promise.all(
        projects.map(async (project) => {
          const appartments = await Appartment.find(
            !room
              ? { projectId: project._id }
              : { projectId: project._id, room }
          );
        })
      );
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = filterCtrl;
