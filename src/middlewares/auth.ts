import { NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { IRequest, IResponse } from "../config/interfaces";
import userConfig from "../config/user.config";

const auth = (req: IRequest, res: IResponse, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return next();
    verify(token, userConfig.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.error.invalidAuthorization(res, 403);
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).send("Invalid token!");
  }
};

export default auth;
