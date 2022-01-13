import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IRequest, IResponse } from "../config/interfaces";
import userConfig from "../config/user.config";

const authRole = (permission: string) => {
  return async (req: IRequest, res: IResponse, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) return next();
      verify(token, userConfig.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.error.invalidAuthorization(res, 403);
        req.user = user;
        if (req.user.permissions.includes(permission)) {
          if (req.user.permissions.includes("viewDeletedData")) {
            req.role = "superadmin";
          }
          req.isAllowed = true;
        }
        next();
      });
    } catch (error) {
      return res.status(400).send("Invalid token!");
    }
  };
};

export default authRole;
