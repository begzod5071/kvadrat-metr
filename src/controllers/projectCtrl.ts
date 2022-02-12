import { IApartment, IRequest, IResponse } from "../config/interfaces";
import { Request } from "express";
import mongoose from "mongoose";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import Developer from "../models/developerModel";

const projectCtrl = {
  getProjects: async (req: IRequest, res: IResponse) => {
    try {
      const {currentPage, perPage} = req.query

      const projects = await Project.aggregate([
        { $match: req.role === "superadmin" ? {} : req.isAllowed ? { isShow: true } : { isActive: true, isShow: true }},
        { $sort: {"createdAt": -1}},
        { 
          $facet: {
            metadata: [{ $count: "total" }, { $addFields: { page: Number(currentPage) } }],
            data: [{ $skip: (Number(currentPage) - 1) * Number(perPage) }, { $limit: Number(perPage) }],
          },
        },
      ]);

      res.json({
        projects: projects,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },

  getPopularProjects: async (req: IRequest, res: IResponse) => {
    try {
      const projects = await Project.aggregate([
        { $match: req.role === "superadmin" ? {} : req.isAllowed ? { isShow: true } : { isActive: true, isShow: true }},
        { $sort: {"click": -1}},
        { $limit : 6 }
      ]);

      res.json({
        projects: projects,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },

  createProject: async (req: IRequest, res: IResponse) => {
    
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);
      
      const {developerId, name, logoProject, images} = req.body;

      const developer = await Developer.findById(developerId);
      if (!developer) return res.error.developerNotFound(res);

      const newProject = new Project({
        developerId,
        name,
        logoProject,
        images,
      });
      await newProject.save();

      res.status(201).json({ message: "Created project" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  getOneProject: async (req: IRequest, res: IResponse) => {
    try {
      await Project.findByIdAndUpdate(req.params.id, { $inc: { click: 1 } });

      const project = await Project.aggregate([
        { $match: {_id: new mongoose.Types.ObjectId(req.params.id)}},
        {$lookup: {from: "developers", let: { developerId: "$developerId" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$developerId"] } } }
            ],
            as: "developer",
          },
        }
      ]);

      if (project.length === 0) return res.error.projectNotFound(res);

      res.json({ project });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateProject: async (req: IRequest, res: IResponse) => {
    console.log(req.body);    
    
    try {
      const Allowed = req.isAllowed;

      if (!Allowed) return res.error.notAllowed(res);

      const project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body
      );

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
