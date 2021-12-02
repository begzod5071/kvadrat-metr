import { Document } from "mongoose";
import { Response, Request } from "express";

export interface IResponse extends Response {
  error: object;
}

export interface IDeveloper extends Document {
  name: string;
  image: object;
  info: object;
  contact: object;
  social: object;
  location: object;
  projects: [object];
}

export interface IProject extends Document {
  developerId: string;
  name: string;
  floor: {
    to: number;
    from: number;
  };
  area: {
    to: number;
    from: number;
  };
  rooms: {
    to: number;
    from: number;
  };
  repair: boolean;
  parking: boolean;
  isActive: boolean;
  year: number;
  location: {
    address: string;
    landmark: string;
    map: string;
    region: string;
  };
  images: {
    url: string;
    public_id: string;
  };
  info: {
    uz: string;
    ru: string;
    en: string;
  };
  appartments: object[];
}

export interface IAppartment {
  _id: string;
  projectId: string;
  image: {
    url: string;
    public_id: string;
  };
  room: number;
  area: number;
  bathroom: number;
  price: number;
  leads: object[];
  click: number;
  view: number;
  __v: number;
  createdAt: Date;
  updatedAt: Date;
}
