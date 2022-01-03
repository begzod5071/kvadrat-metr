import { IResponse } from "../config/interfaces";
import { Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModels";
import jwt from "jsonwebtoken";


const userCtrl = {
  login: async (req: Request, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.error.userNotFound(res);

      const matchPassword = await validatePassword(password, user.password);
      if (!matchPassword) return res.error.passwordNotMatch(res);

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        path: "/api/token",
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });

      res.json({
        accessToken,
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },
};

// Hash
const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

// Token
const createAccessToken = (user: object | string) => {
  return jwt.sign(user, , {
    expiresIn: "3d",
  });
};
const createRefreshToken = (user: object | any) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export default userCtrl;