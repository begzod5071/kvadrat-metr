import { Request } from "express";
import Appartment from "../models/appartmentModel";
import Project from "../models/projectModel";
import Lead from "../models/leadModel";
import Device from "../models/deviceModel";
import { IResponse, IAppartment, ILead } from "../config/interfaces";

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
      const appartment: object = await Appartment.findById(req.params.id);
      if (!appartment) return res.error.appartmentNotFound(res);

      const leads = await Lead.find({ appartmentId: appartment._id });

      appartment.leads = leads;

      res.json(appartment);
    } catch (err) {
      return res.error.serverErr(res, err);
    }
  },
  postView: async (req: Request, res: IResponse) => {
    try {
      const { appartmentId, deviceId, event } = req.body;

      const appartment: object[] = await Appartment.findById(appartmentId);
      if (!appartment) return res.error.appartmentNotFound(res);

      const dayAgo: Date = new Date(new Date() - 12 * 60 * 60 * 1000);

      await Device.deleteMany({ createdAt: { $lte: dayAgo } });

      const device = await Device.find({ appartmentId, deviceId, event });

      if (device.length !== 0) return res.json({ message: "oldin ko'rilgan" });

      const newDevice = new Device({ appartmentId, deviceId, event });
      await newDevice.save();

      await Appartment.findByIdAndUpdate(appartmentId, {
        [event]: appartment[event] + 1,
      });

      res.json({ message: "created" });
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

      const appartment = await Appartment.findByIdAndUpdate(
        appartmentId,
        req.body
      );
      if (!appartment) return res.error.appartmentNotFound(res);

      res.json({
        message: "appartment updated",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
  deleteAppartment: async (req: Request, res: IResponse) => {
    try {
      const appartment = await Appartment.findById(req.params.id);
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
