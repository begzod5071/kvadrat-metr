import { IResponse } from "../config/interfaces";
import { Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import userConfig from "../config/user.config";
import helperFunctions from "../service/generatePassword";
import sendEmail from "../utils/sendEmail";

const userCtrl = {
  login: async (req: Request, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.error.userNotFound(res);

      const matchPassword = await validatePassword(password, user.password);
      if (!matchPassword) return res.error.passwordNotMatch(res);

      const accessToken = createAccessToken({ id: user._id, role: user.role });
      const refreshToken = createRefreshToken({
        id: user._id,
        role: user.role,
      });

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

  signUp: async (req: Request, res: IResponse) => {
    try {
      const { email, name, role } = req.body;

      if (!email || !name || !role) return res.error.dataNotEnough(res);

      const checkUser = await User.find({ email });
      if (checkUser.length > 0) return res.error.userExist(res);

      const newPassword: string = await helperFunctions.generatePassword();
      const hashNewPassword: string = await hashPassword(newPassword);

      const resetUrl = `https://kvadratsquare-test.netlify.app`;

      const message = `
      <p>This is your password</p>
      <h1>${newPassword}<h1/>
      <p>Please go to this link to log In your account</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      `;

      try {
        await sendEmail({
          to: email,
          subject: "Your password for login",
          text: message,
        });

        const user = new User({
          role,
          name,
          email,
          password: hashNewPassword,
        });

        await user.save();

        res.status(201).json({
          message: "User created. Password is sent to email",
        });
      } catch (err) {
        console.log(err);
      }

      const user = new User({
        role,
        name,
        email,
        password: hashNewPassword,
      });

      await user.save();
      res.json("ok");
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
  return jwt.sign(user, userConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "3d",
  });
};
const createRefreshToken = (user: object | any) => {
  return jwt.sign(user, userConfig.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export default userCtrl;
