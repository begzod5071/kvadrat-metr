import { Request, Response } from "express";
import Lead from "../models/leadModel";
import Appartment from "../models/appartmentModel";
import { IResponse } from "../config/interfaces";

const leadCtrl = {
  getLeads: async (req: Request, res: IResponse) => {
    try {
      const leads = await Lead.find({});

      res.json({ status: "OK", length: leads.length, leads });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  createLead: async (req: Request, res: IResponse) => {
    try {
      const { appartmentId, name, comment, phone } = req.body;

      const appartment: object = await Appartment.findById(appartmentId);
      if (!appartment) return res.error.appartmentNotFound(res);

      const newLead: object = new Lead({
        appartmentId,
        name,
        phone,
        comment,
      });
      await newLead.save();

      res.status(201).json({ message: "Created lead" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateLead: async (req: Request, res: IResponse) => {
    try {
      const lead: object = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body
      );
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Updated lead" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteLead: async (req: Request, res: IResponse) => {
    try {
      const lead: object = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Deleted lead" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default leadCtrl;
