const Developer = require("../models/developerModel");
const Project = require("../models/projectModel");
const Appartment = require("../models/appartmentModel");
const Lead = require("../models/leadModel");

const developerCtrl = {
  getDevelopers: async (req, res) => {
    try {
      const developers = await Developer.find({});

      const newDevelopers = await Promise.all(
        developers.map(async (developer) => {
          const projects = await Project.find({ developerId: developer._id });

          const newProjects = await Promise.all(
            projects.map(async (project) => {
              const appartments = await Appartment.find({
                projectId: project._id,
              });

              const newAppartments = await Promise.all(
                appartments.map(async (appartment) => {
                  const leads = await Lead.find({
                    appartmentId: appartment._id,
                  });

                  appartment.leads = leads;

                  return appartment;
                })
              );

              project.appartments = newAppartments;

              return project;
            })
          );

          developer.projects = newProjects;

          return developer;
        })
      );

      res.json({
        status: "OK",
        length: newDevelopers.length,
        developers: newDevelopers,
      });
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  getDeveloper: async (req, res) => {
    try {
      const developer = await Developer.findById(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      const projects = await Project.find({ developerId: developer._id });

      const newProjects = await Promise.all(
        projects.map(async (project) => {
          const appartments = await Appartment.find({
            projectId: project._id,
          });

          const newAppartments = await Promise.all(
            appartments.map(async (appartment) => {
              const leads = await Lead.find({
                appartmentId: appartment._id,
              });

              appartment.leads = leads;

              return appartment;
            })
          );

          project.appartments = newAppartments;

          return project;
        })
      );

      developer.projects = newProjects;

      res.json(developer);
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
      const developer = await Developer.findById(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      const projects = await Project.find({ developerId: developer._id });
      await Promise.all(
        projects.map(async (project) => {
          const appartments = await Appartment.find({ projectId: project._id });
          await Promise.all(
            appartments.map(async (appartment) => {
              await Lead.deleteMany({ appartmentId: appartment._id });
            })
          );
          await Appartment.deleteMany({ projectId: project._id });
        })
      );
      await Project.deleteMany({ developerId: developer._id });

      await Developer.findByIdAndDelete(developer._id);

      res.json({ message: "Deleted developer" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = developerCtrl;
