import { Response, Request } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import { IProject, IApartment, IResponse } from "../config/interfaces";

const filterCtrl = {
  getFilter: async (req: Request, res: IResponse) => {
    try {
      const { priceFrom, priceTo } = req.query;

      const queries = { ...req.query };

      ["priceFrom", "priceTo"].map((item: string) => delete queries[item]);

      const apartments = await Apartment.find({
        price: { $gte: priceFrom || 0, $lte: priceTo || 1000000000 },
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
        console.log(newTab);
      }

      const projects = await Project.find({
        ...newTab,
        ...{ _id: { $in: projectIds } },
      });

      res.json({ length: projects.length, projects });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
