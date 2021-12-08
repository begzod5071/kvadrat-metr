import { Response, Request } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import { IProject, IApartment, IResponse } from "../config/interfaces";

const filterCtrl = {
  getFilter: async (req: Request, res: IResponse) => {
    try {
      const { room, district, developerId, priceFrom, priceTo } = req.query;

      const quiries = { ...req.query };

      const replacements: any = {
        district: "location.district",
        room: "rooms",
        developerId: "developerId",
      };

      let replacedItems = Object.keys(quiries).map((key) => {
        if (key === "district" || key === "developerId") {
          const newKey = replacements[key] || key;
          return { [newKey]: { ["$in"]: quiries[key] } };
        }

        if (key === "rooms") {
          const newKey = replacements[key] || key;
          return {
            [`${newKey}.from`]: { ["$lte"]: quiries[key] },
            [`${newKey}.to`]: { ["$gte"]: quiries[key] },
          };
        }
      });
      let newTab: any = {};

      if (replacedItems.length !== 0) {
        newTab = replacedItems.reduce((a, b) => Object.assign({}, a, b));
      }

      const projects = await Project.find(newTab);

      res.json({ length: projects.length, projects });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
