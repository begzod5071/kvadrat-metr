import mongoose from "mongoose";
import { Request } from "express";
import Apartment from "../models/apartmentModel";
import Project from "../models/projectModel";
import Lead from "../models/leadModel";
import Device from "../models/deviceModel";
import {
  IResponse,
  IApartment,
  ILead,
  IEvent,
  IRequest,
} from "../config/interfaces";

const apartmentCtrl = {
  getApartments: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;

      const apartments: IApartment[] = await Apartment.aggregate([
        { $match: Allowed ? {} : { isShow: true }},
        { $sort: {"createdAt": -1}},
        {$lookup: {from: "leads", let: { apartmentId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$apartmentId", "$$apartmentId"] } } }
            ],
            as: "leads",
          },
        }
      ]);

      res.json({
        apartments,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  getApartment: async (req: Request, res: IResponse) => {
    try {
      await Apartment.findByIdAndUpdate(req.params.id, { $inc: { click: 1 } });

      const apartment = await Apartment.aggregate([
        { $match: {_id: new mongoose.Types.ObjectId(req.params.id)}},
        {$lookup: {from: "leads", let: { apartmentId: "$_id" },
            pipeline: [
              { $match: { $expr: { $eq: ["$apartmentId", "$$apartmentId"] } } }
            ],
            as: "leads",
          },
        }
      ]);

      if (apartment.length === 0) return res.error.apartmentNotFound(res);

      res.json(apartment);
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  postView: async (req: Request, res: IResponse) => {
    try {
      const { apartmentId, deviceId, event }: any = req.body;

      const apartment = await Apartment.findById(apartmentId);
      if (!apartment) return res.error.apartmentNotFound(res);

      const currDate: number = new Date().getTime();

      const dayAgo: Date = new Date(currDate - 12 * 60 * 60 * 1000);

      await Device.deleteMany({ createdAt: { $lte: dayAgo } });

      const device = await Device.find({ apartmentId, deviceId, event });

      if (device.length !== 0) return res.json({ message: "oldin ko'rilgan" });

      const newDevice = new Device({ apartmentId, deviceId, event });
      await newDevice.save();

      const count: any = apartment[event];

      await Apartment.findByIdAndUpdate(apartmentId, {
        [event]: count + 1,
      });

      res.json({ message: `Apartment is ${event}ed.` });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  createApartment: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const { projectId, room, image, area, bathroom, price } = req.body;

      const project = await Project.findById(projectId);
      if (!project) return res.error.projectNotFound(res);

      if (!image) return res.error.invalidUploadImage(res);

      const newApartment = new Apartment({
        projectId,
        image,
        room,
        area,
        bathroom,
        price,
      });
      await newApartment.save();

      res.status(201).json({ message: "Created apartment" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  updateApartment: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const apartment = await Apartment.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!apartment) return res.error.apartmentNotFound(res);

      res.json({
        message: "Apartment is updated",
      });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
  
  deleteApartment: async (req: IRequest, res: IResponse) => {req.body.isShow
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const apartment = await Apartment.findByIdAndUpdate(req.params.id, { isShow: req.body.isShow });
      if (!apartment) return res.error.apartmentNotFound(res);

      await Lead.updateMany(
        { apartmentId: req.params.id },
        { $set: { isShow: req.body.isShow } }
      );

      res.json({ message: "Apartment deleted" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default apartmentCtrl;
