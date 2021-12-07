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

      console.log(district);
      const quiries = { ...req.query };

      const projects = await Project.find(
        district
          ? {
              "location.district": { $in: district },
            }
          : {}
      );

      // await Promise.all(
      //   projects.map(async (project) => {
      //     const apartments = await Apartment.find(
      //       !room
      //         ? { projectId: project._id }
      //         : { projectId: project._id, room }
      //     );
      //   })
      // );
      //
      res.json({ length: projects.length, projects });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
