import { Request, Response } from "express";
import Lead from "../models/leadModel";
import Apartment from "../models/apartmentModel";
import { IApartment, ILead, IRequest, IResponse } from "../config/interfaces";

const leadCtrl = {
  getLeads: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const leads = await Lead.find(
        req.role === "superadmin" ? {} : { isShow: true }
      );

      res.json({ status: "OK", length: leads.length, leads });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  createLead: async (req: Request, res: IResponse) => {
    try {
      const { apartmentId, name, comment, phone } = req.body;

      const apartment = await Apartment.findById(apartmentId);
      if (!apartment) return res.error.apartmentNotFound(res);

      const newLead = new Lead({
        apartmentId,
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
      const lead = await Lead.findByIdAndUpdate(req.params.id, req.body);
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Updated lead" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  deleteLead: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const lead = await Lead.findByIdAndDelete(req.params.id);
      if (!lead) return res.error.leadNotFound(res);

      res.json({ message: "Deleted lead" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default leadCtrl;
