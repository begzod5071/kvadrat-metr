import { Request, Response } from "express";
import Developer from "../models/developerModel";

const developerCtrl = {
  getDeveloper: async (req: Request, res: Response) => {
    try {
      res.json("Developer get");
    } catch (err: any) {
      res.status(500).json({ message: "Server error" });
    }
  },
};

export default developerCtrl;
