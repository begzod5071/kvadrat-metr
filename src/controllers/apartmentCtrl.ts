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

      const apartments: IApartment[] = await Apartment.find(
        Allowed ? {} : { isShow: true }
      );

      const newApartment = await Promise.all(
        apartments.map(async (apartment: IApartment) => {
          const leads: ILead[] = await Lead.find({
            apartmentId: apartment._id,
          });

          apartment.leads = leads;

          return apartment;
        })
      );

      res.json({
        status: "OK",
        length: newApartment.length,
        apartments: newApartment,
      });
    } catch (err: any) {
      return res.error.serverErr(res, err);
    }
  },
  getApartment: async (req: Request, res: IResponse) => {
    try {
      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) return res.error.apartmentNotFound(res);

      const leads: ILead[] = await Lead.find({ apartmentId: apartment._id });

      apartment.leads = leads;

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

      const apartmentId: string = req.params.id;

      const apartment = await Apartment.findByIdAndUpdate(
        apartmentId,
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
  deleteApartment: async (req: IRequest, res: IResponse) => {
    try {
      const Allowed = req.isAllowed;
      if (!Allowed) return res.error.notAllowed(res);

      const apartment = await Apartment.findById(req.params.id);
      if (!apartment) return res.error.apartmentNotFound(res);

      await Lead.deleteMany({ apartmentId: apartment._id });

      await Apartment.findByIdAndDelete(apartment._id);

      res.json({ message: "Apartment deleted" });
    } catch (err: any) {
      return res.error.handleError(res, err);
    }
  },
};

export default apartmentCtrl;
