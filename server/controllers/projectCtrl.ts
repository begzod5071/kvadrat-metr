import { Request } from "express";
import Project from "../models/projectModel";
import Lead from "../models/leadModel";
import Developer from "../models/developerModel";
import { IProject, IResponse } from "../config/interfaces";

const projectCtrl = {
  getProjects: async (req: Request, res: IResponse) => {
    try {
      res.error.serverError(res);
    } catch (err: any) {
      throw new Error("Server error");
    }
  },
};

export default projectCtrl;
