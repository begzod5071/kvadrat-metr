import { IApartment, IResponse } from "../config/interfaces";
import { Request } from "express";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import Developer from "../models/developerModel";

const projectCtrl = {
  getProjects: async (req: Request, res: IResponse) => {
    try {
      const projects = await Project.find(1 == 1 ? {} : { isActive: true });

      const newProjects = await Promise.all(
        projects.map(async (project) => {
          const apartments = await Apartment.find({ projectId: project._id });

          const newApartments = await Promise.all(
            apartments.map(async (apartment: IApartment) => {
              const leads = await Lead.find({ apartmentId: apartment._id });

              apartment.leads = leads;

              return apartment;
            })
          );

          project.apartments = newApartments;

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
  createProject: async (req: Request, res: IResponse) => {
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
        district,
      } = req.body;

      const developer = await Developer.findById(developerId);
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
          district,
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
  updateProject: async (req: Request, res: IResponse) => {
    try {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body);
      if (!project) return res.error.projectNotFound(res);

      res.json({ message: "Updated project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteProject: async (req: Request, res: IResponse) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.error.projectNotFound(res);

      const apartments = await Apartment.find({ projectId: project._id });

      await Promise.all(
        apartments.map(async (apartment: IApartment) => {
          await Lead.deleteMany({ apartmentId: apartment._id });
        })
      );

      await Apartment.deleteMany({ projectId: project._id });

      await Project.findByIdAndDelete(project._id);

      res.json({ message: "Deleted project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default projectCtrl;