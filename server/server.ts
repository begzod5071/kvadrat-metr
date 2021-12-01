import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import routes from "./routes/index";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Routes
app.use("/api", routes);

// Database
import "./config/database";

// Listening
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server started on th port ${PORT}`));
