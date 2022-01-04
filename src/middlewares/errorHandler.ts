import { Request, Response, NextFunction } from "express";
import { IResponse } from "../config/interfaces";

const errorHandler = (req: Request, res: any, next: NextFunction) => {
  const error: object = {
    serverErr: async (res: Response, err: any) => {
      res.status(500).json({
        err: {
          name: "ServerErr",
          message: `International server error: ${err.message}`,
        },
      });
    },
    handleError: async (res: Response, err: any) => {
      switch (err.name) {
        case "ValidationError":
          return res.status(400).json({ err });
        case "CastError":
          return res.status(400).json({ err });
        default:
          return res.status(500).json({
            err: {
              name: "ServerErr",
              message: `International server error: ${err.message}`,
            },
          });
      }
    },
    noUpload: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "NoUpload",
          message: "No upload file",
        },
      });
    },
    invalidSize: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidSize",
          message: "File large",
        },
      });
    },
    invalidType: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidType",
          message: "File format png or jpeg",
        },
      });
    },
    invalidPublicId: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidPublicId",
          message: "No checked image",
        },
      });
    },
    invalidUploadImage: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "InvalidUploadImage",
          message: "No Upload Image is required",
        },
      });
    },
    developerNotFound: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "DeveloperNotFound",
          message: "Developer is not exist.",
        },
      });
    },
    projectNotFound: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "ProjectNotFound",
          message: "Project is not exist.",
        },
      });
    },
    apartmentNotFound: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "ApartmentNotFound",
          message: "Apartment is not exist.",
        },
      });
    },
    leadNotFound: async (res: Response) => {
      res.status(400).json({
        err: {
          name: "LeadNotFound",
          message: "Lead is not exist.",
        },
      });
    },
    userNotFound: async (res: Response) => {
      res.status(404).json({
        name: "userNotFound",
        message: "a user is not exist",
      });
    },
    passwordNotMatch: async (res: Response) => {
      res.status(404).json({
        name: "passwordNotMatch",
        message: "Password does not match",
      });
    },
    dataNotEnough: async (res: Response) => {
      res.status(400).json({
        name: "dataNotEnough",
        message: "Please fill all the fields!",
      });
    },
  };

  res.error = error;

  next();
};

export default errorHandler;
