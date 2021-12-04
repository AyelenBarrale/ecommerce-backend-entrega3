import dotenv from "dotenv";
import mongoose from "mongoose";
import emoji from "node-emoji";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
  if (!err) {
    console.log(emoji.get("fire"), "Mongodb is connected to database");
  } else {
    console.log(err);
  }
});

export default mongoose;