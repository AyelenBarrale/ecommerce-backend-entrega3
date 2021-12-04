import mongoose from "mongoose";

const ProdSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    foto: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", ProdSchema);
