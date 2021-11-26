const Developer = require("../models/developerModel");
const Project = require("../models/projectModel");
const Appartment = require("../models/appartmentModel");
const Lead = require("../models/leadModel");

const developerCtrl = {
  getDevelopers: async (req, res) => {
    try {
      const developers = await Developer.find({});

      res.json({ developers });
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  createDeveloper: async (req, res) => {
    try {
      const {
        name,
        image,
        infoUz,
        infoRu,
        infoEn,
        phone,
        web,
        email,
        callCenter,
        facebook,
        instagram,
        tiktok,
        telegram,
        youtube,
        twitter,
        address,
        landmark,
        map,
      } = req.body;

      if (!image) return res.error.invalidUploadImage(res);

      const newDeveloper = new Developer({
        name,
        image,
        info: { uz: infoUz, ru: infoRu, en: infoEn },
        contact: { web, phone, email, callCenter },
        social: { facebook, instagram, tiktok, telegram, youtube, twitter },
        location: { address, landmark, map },
      });
      await newDeveloper.save();

      res.status(201).json({ message: "Created developer" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateDeveloper: async (req, res) => {
    try {
      const developer = await Developer.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!developer) return res.error.developerNotFound(res);

      res.json({ message: "Updated developer" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteDeveloper: async (req, res) => {
    try {
      const developer = await Developer.findByIdAndDelete(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      const projects = await Project.find({ developerId: developer._id });
      await Promise.all(
        projects.map(async (project) => {
          const appartments = await Appartment.find({ projectId: project._id });
          await Promise.all(
            appartments.map(async (appartment) => {
              const leads = await Lead.find({ appartmentId: appartment._id });

              await Promise.all(
                leads.map(async (lead) => {
                  await Lead.findByIdAndDelete(lead._id);
                })
              );

              await Appartment.findByIdAndDelete(appartment._id);
            })
          );
          await Project.findByIdAndDelete(project._id);
        })
      );

      await Developer.findByIdAndDelete(developer._id);

      res.json({ message: "Deleted developer" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = developerCtrl;
