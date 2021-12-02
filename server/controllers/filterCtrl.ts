import { Response, Request } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Appartment from "../models/appartmentModel";
import Lead from "../models/leadModel";

const filterCtrl: object = {
  getFilter: async (req: Request, res: Response) => {
    try {
      const { district, room, develover, priceFrom, priceTo } = req.params;

      const projects: object = await Project.find(
        !district ? {} : { location: { region: district } }
      );

      await Promise.all(
        projects.map(async (project: object) => {
          const appartments: object[] = await Appartment.find(
            !room
              ? { projectId: project._id }
              : { projectId: project._id, room }
          );
        })
      );
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
