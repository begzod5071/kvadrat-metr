import {
  IResponse,
  IDeveloper,
  IProject,
  IApartment,
  ILead,
  IRequest,
  IRole,
} from "../config/interfaces";
import { Request, Response } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import Roles from "../models/roleModel";

const developerCtrl = {
  getDevelopers: async (req: IRequest, res: IResponse) => {
    try {
      let isAllowed = null;
      const roleId = req.user?.role;

      const role = await Roles.findById(roleId);

      role &&
        (isAllowed = role.permissions.find(
          (permission: string) => permission === "viewDeletedData"
        ));

      const developers: IDeveloper[] = await Developer.find(
        isAllowed ? {} : { isShow: true }
      );

      const newDevelopers = await Promise.all(
        developers.map(async (developer: IDeveloper) => {
          const projects: IProject[] = await Project.find({
            developerId: developer._id,
          });

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

          return developer;
        })
      );

      res.json({
        status: "OK",
        length: newDevelopers.length,
        developers: newDevelopers,
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
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateDeveloper: async (req: Request, res: IResponse) => {
    try {
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
  deleteDeveloper: async (req: Request, res: IResponse) => {
    try {
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
                { $set: { isShow: false } }
              );
            })
          );
          await Apartment.updateMany(
            { projectId: project._id },
            { $set: { isShow: false } }
          );
        })
      );
      await Project.updateMany(
        { developerId: developer._id },
        { $set: { isShow: false } }
      );

      await Developer.findByIdAndUpdate(developer._id, { isShow: false });

      res.json({ message: "Deleted developer" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default developerCtrl;
