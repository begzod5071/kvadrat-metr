import { Document } from "mongoose";
import { Response, Request } from "express";

export interface IResponse extends Response {
  error?: any;
}

export interface IRequest extends Request {
  files?: any;
}

export interface IDeveloper extends Document {
  name: string;
  image: IImage;
  info: IInfo;
  contact: IContact;
  social: ISocial;
  location: ILocation;
  projects: IProject[];
}

export interface IProject extends Document {
  developerId: string;
  name: string;
  floor: IFromTo;
  area: IFromTo;
  rooms: IFromTo;
  repair: boolean;
  parking: boolean;
  isActive: boolean;
  year: number;
  location: IProjectLocation;
  images: IImage[];
  info: IInfo;
  apartments: IApartment[];
}

export interface IApartment extends Document {
  projectId: string;
  image: IImage;
  room: IFromTo;
  area: IFromTo;
  bathroom: number;
  price: number;
  leads: ILead[];
  click: number;
  view: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUsers extends Document {
  role: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ILead extends Document {
  projectId: string;
  image: IImage;
  room: IFromTo;
  area: IFromTo;
  bathroom: number;
  price: number;
  leads: ILead[];
  click: number;
  view: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IImage {
  url: string;
  public_id: string;
}

export interface IFromTo {
  from: number;
  to: number;
}

export interface IInfo {
  uz: string;
  ru: string | null;
  en: string | null;
}

export interface ILocation {
  address: string;
  landmark: string;
  map: string;
}

export interface IProjectLocation extends ILocation {
  district: string;
}

export interface ISocial {
  facebook: string;
  instagram: string;
  tiktok: string;
  telegram: string;
  youtube: string;
  twitter: string;
}

export interface IContact {
  phone: string;
  web: string;
  email: string;
  callCenter: string;
}

export interface IQuery {
  sort?: string | string[];
}

export interface IRole {
  name: string;
  permissions: string[];
}
