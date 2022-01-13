import {v2 as cloudinary} from "cloudinary"
import express from "express"
import { IImage, IRequest, IResponse } from "../config/interfaces";

const router = express.Router();


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
})

router.post("/upload",async (req: IRequest, res: IResponse) => {
  const {tempFilePath} = req.files.photo
  try {
    cloudinary.uploader.upload(tempFilePath, (err: object, result: IImage)=> { 
      const image: IImage = {
        public_id: result.public_id, url: result.url
      }
      res.status(201).json(image)
     });
  } catch (err) {
    return res.error.handleError(res, err);
  }
});

export default router;


