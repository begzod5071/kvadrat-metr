import { Response, Request } from "express";
import Developer from "../models/developerModel";
import Project from "../models/projectModel";
import Apartment from "../models/apartmentModel";
import Lead from "../models/leadModel";
import { IProject, IApartment, IResponse } from "../config/interfaces";

const filterCtrl = {
  getFilter: async (req: Request, res: IResponse) => {
    try {
      const { room } = req.query;
      console.log(room);

      const apartments: IApartment[] = await Apartment.find({
        room: { $in: room },
      });

      // await Promise.all(
      //   projects.map(async (project) => {
      //     const apartments = await Apartment.find(
      //       !room
      //         ? { projectId: project._id }
      //         : { projectId: project._id, room }
      //     );
      //   })
      // );
      console.log(apartments);

      res.json({ apartments });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default filterCtrl;
