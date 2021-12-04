import mongoose from "mongoose";

const Schema = mongoose.Schema;

const carritoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    productos: [{
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product"/* ,
          quantity: {
            type: Number,
          } */
        }
      }],
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Carrito", carritoSchema);


