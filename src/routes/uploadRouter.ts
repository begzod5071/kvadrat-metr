import {v2 as cloudinary} from "cloudinary"
import express from "express"
const fs = require("fs");
import { IRequest, IResponse } from "../config/interfaces";

const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post("/upload",async (req: IRequest, res: IResponse) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "No upload file" });
    }

    const file = req.files.file;
    if (file.size > 5 * 1024 * 1024) {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "File large" });
    }

    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTmp(file.tempFilePath);
      return res.status(400).json({ message: "File format png or jpeg" });
    }

    cloudinary.uploader.upload(
      file.tempFilePath,
      { folder: "Kvadratmetr images" },
      async (err, result: any) => {
        if (err) throw err;

        removeTmp(file.tempFilePath);

        res.json({ public_id: result.public_id, url: result.secure_url });
      }
    );
  } catch (err) {
    return res.error.handleError(res, err);
  }
});

const removeTmp = (path: string) => {
  fs.unlink(path, (err: object) => {
    if (err) throw err;
  });
};


export default router;


