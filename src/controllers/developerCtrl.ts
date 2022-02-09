import {
  IResponse,
  IDeveloper,
  IProject,
  IApartment,
  ILead,
  IRequest,
} from "../config/interfaces";
import { Request, Response } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";

const developerCtrl = {
  getDevelopers: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;

      const developers = await Developer.aggregate([
        {
          $match:
            req.role === "superadmin" ? {} : { isShow: true, isActive: true },
        },
        {
          $lookup: {
            from: "projects",
            let: { developerId: "$_id" },
            pipeline: [
              {
                $match:
                  req.role === "superadmin"
                    ? {}
                    : Allowed
                    ? { isShow: true }
                    : { isShow: true, isActive: true },
              },
              { $match: { $expr: { $eq: ["$developerId", "$$developerId"] } } },
              {
                $lookup: {
                  from: "apartments",
                  let: { projectId: "$_id" },
                  pipeline: [
                    {
                      $match: { $expr: { $eq: ["$projectId", "$$projectId"] } },
                    },
                    {
                      $lookup: {
                        from: "leads",
                        let: { apartmentId: "$_id" },
                        pipeline: [
                          {
                            $match: {
                              $expr: { $eq: ["$apartmentId", "$$apartmentId"] },
                            },
                          },
                        ],
                        as: "leads",
                      },
                    },
                  ],
                  as: "apartments",
                },
              },
            ],
            as: "projects",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userId: "$userId" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } }],
            as: "manager",
          },
        },
      ]);
      res.json({
        status: "OK",
        length: developers.length,
        developers,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  getDeveloper: async (req: Request, res: IResponse) => {
    try {
      const developer = await Developer.findById(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      const projects = await Project.find({ developerId: developer._id });

      const newProjects = await Promise.all(
        projects.map(async (project: IProject) => {
          const apartments = await Apartment.find({
            projectId: project._id,
          });

          const newApartments = await Promise.all(
            apartments.map(async (apartment: IApartment) => {
              const leads = await Lead.find({
                apartmentId: apartment._id,
              });

              apartment.leads = leads;

              return apartment;
            })
          );

          project.apartments = newApartments;

          return project;
        })
      );

      developer.projects = newProjects;

      res.json(developer);
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },

  createDeveloper: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);
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

      res
        .status(201)
        .json({ message: "Created developer", id: newDeveloper._id });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateDeveloper: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);
      const developer = await Developer.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!developer) return res.error.developerNotFound(res);

      res.json({ message: "Updated developer" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteDeveloper: async (req: IRequest, res: IResponse) => {
    try {
      const { isShow } = req.body;

      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const developer = await Developer.findById(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      const projects = await Project.find({ developerId: developer._id });
      await Promise.all(
        projects.map(async (project: IProject) => {
          const apartments = await Apartment.find({ projectId: project._id });
          await Promise.all(
            apartments.map(async (apartment: IApartment) => {
              await Lead.updateMany(
                { apartmentId: apartment._id },
                { $set: { isShow: isShow, isActive: isShow } }
              );
            })
          );
          await Apartment.updateMany(
            { projectId: project._id },
            { $set: { isShow: isShow, isActive: isShow } }
          );
        })
      );
      await Project.updateMany(
        { developerId: developer._id },
        { $set: { isShow: isShow, isActive: isShow } }
      );

      await Developer.findByIdAndUpdate(developer._id, {
        isShow: isShow,
        isActive: isShow,
      });

      res.json({ message: "Deleted developer" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },

  hideDeveloper: async (req: IRequest, res: IResponse) => {
    try {
      const { isActive } = req.body;
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const developer = await Developer.findById(req.params.id);
      if (!developer) return res.error.developerNotFound(res);

      await Project.updateMany(
        { developerId: developer._id },
        { $set: { isActive } }
      );

      await Developer.findByIdAndUpdate(developer._id, { isActive });

      res.json({ message: "Changed developer" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default developerCtrl;
