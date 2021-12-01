import { Request, Response } from "express";
import Project from "../models/projectModel";
import Appartment from "../models/appartmentModel";
import Lead from "../models/leadModel";
import Developer from "../models/developerModel";

const projectCtrl = {
  getProjects: async (req: Request, res: Response) => {
    try {
      const projects: object[] = await Project.find(
        1 == 1 ? {} : { isActive: true }
      );

      const newProjects = await Promise.all(
        projects.map(async (project: object) => {
          const appartments: object[] = await Appartment.find({
            projectId: project._id,
          });

          const newAppartments = await Promise.all(
            appartments.map(async (appartment: object) => {
              const leads: object[] = await Lead.find({
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

      res.json({
        status: "OK",
        length: newProjects.length,
        projects: newProjects,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  createProject: async (req: Request, res: Response) => {
    try {
      const {
        developerId,
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

      const developer: object = await Developer.findById(developerId);
      if (!developer) return res.error.developerNotFound(res);

      const newProject = new Project({
        developerId,
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

      res.status(201).json({ message: "Created project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateProject: async (req: Request, res: Response) => {
    try {
      const project: object = await Project.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!project) return res.error.projectNotFound(res);

      res.json({ message: "Updated project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteProject: async (req: Request, res: Response) => {
    try {
      const project: object = await Project.findById(req.params.id);
      if (!project) return res.error.projectNotFound(res);

      const appartments: object[] = await Appartment.find({
        projectId: project._id,
      });

      await Promise.all(
        appartments.map(async (appartment: object) => {
          await Lead.deleteMany({ appartmentId: appartment._id });
        })
      );

      await Appartment.deleteMany({ projectId: project._id });

      await Project.findByIdAndDelete(project._id);

      res.json({ message: "Deleted project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default projectCtrl;
