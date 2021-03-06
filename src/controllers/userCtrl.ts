import { IResponse } from "../config/interfaces";
import { Request } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import userConfig from "../config/user.config";
import helperFunctions from "../service/generatePassword";
import sendEmail from "../utils/sendEmail";
import Roles from "../models/roleModel";
import Developer from "../models/developerModel";

const userCtrl = {
  login: async (req: Request, res: IResponse) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) return res.error.userNotFound(res);

      const matchPassword = await validatePassword(password, user.password);
      if (!matchPassword) return res.error.passwordNotMatch(res);
      const userRole = await Roles.findById(user.role);
      if (!userRole) return res.error.roleNotExist(res);
      const accessToken = createAccessToken({
        id: user._id,
        name: user.name,
        role: userRole.name,
        permissions: userRole.permissions,
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
      const { email, name, role, password, developerId } = req.body.userData;

      if (!email || !name || !role || !password)
        return res.error.dataNotEnough(res);

      const checkUser = await User.exists({ email });
      if (checkUser) return res.error.userExist(res);

      // const newPassword: string = await helperFunctions.generatePassword();
      const hashNewPassword: string = await hashPassword(password);

      // const resetUrl = `https://kvadratsquare-test.netlify.app`;

      // const message = `
      // <p>This is your password</p>
      // <h1>${newPassword}<h1/>
      // <p>Please go to this link to log In your account</p>
      // <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
      // `;

      // try {
      //   const result = await sendEmail({
      //     to: email,
      //     subject: "Your password for login",
      //     text: message,
      //   });
      //   if (!result.info)
      //     return res
      //       .status(500)
      //       .json({ message: "an error occurred" + result.err });

      //   const user = new User({
      //     role,
      //     name,
      //     email,
      //     password: hashNewPassword,
      //   });

      //   await user.save();

      //   res.status(201).json({
      //     message: "User created. Password is sent to email",
      //   });
      // } catch (err) {
      //   console.log(err);
      // }

      const user = new User({
        role,
        name,
        email,
        password: hashNewPassword,
      });

      const newUser = await user.save();

      await Developer.findByIdAndUpdate(developerId, { userId: newUser._id });

      res.status(201).json({
        message: "User created",
      });
    } catch (err) {
      return res.error.handleError(res, err);
    }
  },

  updateUser: async (req: Request, res: IResponse) => {
    try {
      const { email, name, role, password } = req.body.userData;

      const user = await User.findById(req.params.id)
      if (!user) return res.error.userNotFound(res)

      if (email !== user.email) {
        const checkEmail = await User.findOne({ email });
        if (checkEmail)
          return res.error.userExist(res);
      }
      
      const hashNewPassword: string =
        password && (await hashPassword(password));

       await User.findByIdAndUpdate(req.params.id, {
        role,
        name,
        email,
        password: hashNewPassword,
      });

      res.json({
        message: "User updated",
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
  return jwt.sign(user, userConfig.ACCESS_TOKEN_SECRET, {
    expiresIn: "31d",
  });
};

export default userCtrl;
