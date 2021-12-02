import { Request } from "express";
import Appartment from "../models/appartmentModel";
import Project from "../models/projectModel";
import Lead from "../models/leadModel";
import Device from "../models/deviceModel";
import { IResponse, IAppartment, ILead, IProject } from "../config/interfaces";

const appartmentCtrl = {
  getAppartments: async (req: Request, res: IResponse) => {
    try {
      const appartments: IAppartment[] = await Appartment.find({});

      const newAppartment = await Promise.all(
        appartments.map(async (appartment: IAppartment) => {
          const leads: ILead[] = await Lead.find({
            appartmentId: appartment._id,
          });

          appartment.leads = leads;

          return appartment;
        })
      );

      res.json({
        status: "OK",
        length: newAppartment.length,
        appartments: newAppartment,
      });
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  getAppartment: async (req: Request, res: IResponse) => {
    try {
      const appartment: IAppartment = await Appartment.findById(req.params.id);
      if (!appartment) return res.error.appartmentNotFound(res);

      const leads: ILead[] = await Lead.find({ appartmentId: appartment._id });

      appartment.leads = leads;

      res.json(appartment);
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  postView: async (req: Request, res: IResponse) => {
    try {
      const { appartmentId, deviceId, event } = req.body;

      const appartment: IAppartment[] = await Appartment.findById(appartmentId);
      if (!appartment) return res.error.appartmentNotFound(res);

      const currDate: number = new Date().getTime();

      const dayAgo: Date = new Date(currDate - 12 * 60 * 60 * 1000);

      await Device.deleteMany({ createdAt: { $lte: dayAgo } });

      const device = await Device.find({ appartmentId, deviceId, event });

      if (device.length !== 0) return res.json({ message: "oldin ko'rilgan" });

      const newDevice = new Device({ appartmentId, deviceId, event });
      await newDevice.save();

      const count: any = appartment[event];

      await Appartment.findByIdAndUpdate(appartmentId, {
        [event]: count + 1,
      });

      res.json({ message: `Appartment is ${event}ed.` });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  postAppartment: async (req: Request, res: IResponse) => {
    try {
      const { projectId, room, image, area, bathroom, price } = req.body;

      const project = await Project.findById(projectId);
      if (!project) return res.error.projectNotFound(res);

      if (!image) return res.error.invalidUploadImage(res);

      const newAppartment = new Appartment({
        projectId,
        image,
        room,
        area,
        bathroom,
        price,
      });
      await newAppartment.save();

      res.status(201).json({ message: "Created appartment" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  updateAppartment: async (req: Request, res: IResponse) => {
    try {
      const appartmentId = req.params.id;

      const appartment: IAppartment = await Appartment.findByIdAndUpdate(
        appartmentId,
        req.body
      );
      if (!appartment) return res.error.appartmentNotFound(res);

      res.json({
        message: "Appartment is updated",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteAppartment: async (req: Request, res: IResponse) => {
    try {
      const appartment: IAppartment = await Appartment.findById(req.params.id);
      if (!appartment) return res.error.appartmentNotFound(res);

      await Lead.deleteMany({ appartmentId: appartment._id });

      await Appartment.findByIdAndDelete(appartment._id);

      res.json({ message: "Appartment deleted" });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

module.exports = appartmentCtrl;
