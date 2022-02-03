import { IApartment, IRequest, IResponse } from "../config/interfaces";
import { Request } from "express";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import Developer from "../models/developerModel";

const projectCtrl = {
  getProjects: async (req: IRequest, res: IResponse) => {
    try {
      const projects = await Project.find(
        req.role === "superadmin"
          ? {}
          : req.isAllowed
          ? { isShow: true }
          : { isActive: true, isShow: true }
      )
        .populate("developerId")
        .sort("-month");

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
  createProject: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);
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
        characters,
        bathroom,
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
        characters,
        isActive,
        bathroom,
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
  getOneProject: async (req: IRequest, res: IResponse) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) return res.error.projectNotFound(res);

      const count: number = project["click"];

      await Project.findByIdAndUpdate(req.params.id, { click: count + 1 });

      res.json({ project });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateProject: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const project = await Project.findByIdAndUpdate(req.params.id, req.body);
      if (!project) return res.error.projectNotFound(res);

      res.json({ message: "Updated project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteProject: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const project = await Project.findById(req.params.id);
      if (!project) return res.error.projectNotFound(res);

      const apartments = await Apartment.find({ projectId: project._id });

      await Promise.all(
        apartments.map(async (apartment: IApartment) => {
          await Lead.updateMany(
            { apartmentId: apartment._id },
            { $set: { isShow: false } }
          );
        })
      );

      await Apartment.updateMany(
        { projectId: project._id },
        { $set: { isShow: false } }
      );

      await Project.findByIdAndUpdate(project._id, { isShow: false });

      res.json({ message: "Deleted project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default projectCtrl;
