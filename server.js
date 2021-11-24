if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 6000;
const URL = process.env.MONGO_URL;

// Middlewares
app.use(express.json());

// Routes
app.use("/", require("./routes/projectRouter"));

const start = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    app.listen(PORT, console.log(`Server started on th port ${PORT}`));
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

start();
