import { Document } from "mongoose";
import { Response, Request } from "express";

export interface IResponse extends Response {
  error?: any;
}

export interface IRequest extends Request {
  files?: any;
  user?: any;
  isAllowed?: boolean;
  role?: string;
}

export interface IDeveloper extends Document {
  _id:string;
  name: string;
  userId: string;
  image: IImage;
  info: IInfo;
  contact: IContact;
  social: ISocial;
  isActive: boolean;
  isShow: boolean;
  location: ILocation;
  projects: IProject[];
}

export interface ICharacter {
  elevator: boolean;
  workzone: boolean;
  terrace: boolean;
  kindergarden: boolean;
  wifi: boolean;
  bedroom: boolean;
  supermarket: boolean;
  parking: boolean;
  panoramicWindow: boolean;
  restaurant: boolean;
  security: boolean;
  playground: boolean;
}

export interface IProject extends Document {
  developerId: string;
  name: string;
  floor: IFromTo;
  area: IFromTo;
  rooms: IFromTo;
  repair: boolean;
  bathroom: IFromTo;
  parking: boolean;
  characters: ICharacter;
  click: number;
  isActive: boolean;
  isShow: boolean;
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
  click?: number;
  view?: number;
  isShow: boolean;
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
  isShow: boolean;
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
  uz: string | null;
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
  name?: string;
  permissions?: string[];
}

export interface IEvent {
  apartmentId: string;
  deviceId: string;
  enum: any;
}

export interface ISendEmail {
  to: string;
  subject: string;
  text: string;
}
