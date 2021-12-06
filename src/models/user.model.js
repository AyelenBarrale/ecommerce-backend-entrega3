import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      default: "user"
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Carrito"
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
