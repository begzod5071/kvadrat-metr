import mongoose, { ConnectOptions } from "mongoose";

const URI = process.env.MONGO_URL;

const db = async () => {
  try {
    await mongoose.connect(`${URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log("Mongodb connection");
  } catch (err: any) {
    console.error(err.message);
  }
};

db();
