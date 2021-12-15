import mongoose from "mongoose";
import Product from "../models/prod.model.js";

const Schema = mongoose.Schema;

const carritoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productos: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product" ,
          /* qty: {
            type: Number,
          }, */
        },
      },
    ],
    /* totalPrice: {
      type: Number,
      require: true
    }, */
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

carritoSchema.methods.addToCart = async function (productId) {
  const product = await Product.findById(productId);
  if (product) {
    const cart = this;
    const isExisting = cart.productos.findIndex(
      (objInProductos) =>
        new String(objInProductos.productId).trim() ===
        new String(product._id).trim()
    );

    if (isExisting >= 0) {
      cart.productos[isExisting].qty += 1;
    } else {
      cart.productos.push({ productId: product._id, qty: 1 });
    }

    if (!cart.totalPrice) {
      cart.totalPrice = 0;
    }
    cart.totalPrice += product.price;
    return cart.save();
  }
};

carritoSchema.methods.removeFromCart = function (productId) {
  const cart = this;
  const isExisting = cart.productos.findIndex(
    (objInProductos) =>
      new String(objInProductos.productId).trim() ===
      new String(productId).trim()
  );
  if (isExisting >= 0) {
    cart.productos.splice(isExisting, 1);
    return cart.save();
  }
};

export default mongoose.model("Carrito", carritoSchema);
