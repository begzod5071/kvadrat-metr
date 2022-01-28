import { Response, Request } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import { IProject, IApartment, IResponse } from "../config/interfaces";

const filterCtrl = {
  getFilter: async (req: Request, res: IResponse) => {
    try {
      console.log(req.query); 

      const { priceFrom, priceTo } = req.query;

      const queries = { ...req.query };

      ["priceFrom", "priceTo"].map((item: string) => delete queries[item]);

      const apartments: IApartment[] = await Apartment.find({
        price: { $gte: priceFrom || 0, $lte: priceTo || 1000000000 },
        isShow: true,
      });

      const projectIds = apartments.map((apartment) => {
        return apartment.projectId;
      });

      const replacements: any = {
        district: "location.district",
        room: "rooms",
        developerId: "developerId",
      };

      let replacedItems = Object.keys(queries).map((key) => {
        if (key === "district" || key === "developerId") {
          const newKey = replacements[key] || key;
          return { [newKey]: { ["$in"]: queries[key] } };
        }

        if (key === "rooms") {
          const newKey = replacements[key] || key;
          return {
            [`${newKey}.from`]: { ["$lte"]: queries[key] },
            [`${newKey}.to`]: { ["$gte"]: queries[key] },
          };
        }
      });
      let newTab: any = {};

      if (replacedItems.length !== 0) {
        newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
      }

      const projects = await Project.find({
        ...newTab,
        ...{ _id: { $in: projectIds } },
        isActive: true,
      }).populate("developerId");

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

      res.json({ length: newProjects.length, newProjects });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
