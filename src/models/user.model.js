import Product from "../models/prod.model.js";
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
      default: "user",
    },
    cart: {
      productos: [
        {
          productId: {
            type: Schema.Types.ObjectId,
            ref: "Product",
          },
          qty: {
            type: Number,
          },
        },
      ],
      totalPrice: {
        type: Number,
        require: true,
      },
      modifiedOn: {
        type: Date,
        default: Date.now,
      },
    },
  },
  {
    timestamps: true,
  }
);


UserSchema.methods.addToCart = async function (product) {
  let cart = this.cart


  if(cart.productos.length === 0) {
    cart.productos.push({ productId: product._id, qty: 1 });
    cart.totalPrice = product.price
  } else {
    const isExisting = cart.productos.findIndex(
      (objInProductos) =>
        new String(objInProductos.productId).trim() ===
        new String(product._id).trim()
    );

    if (isExisting === -1) {
      cart.productos.push({ productId: product._id, qty: 1 });
      cart.totalPrice += product.price
    } else {
      let existingProductInCart = cart.productos[isExisting];
      existingProductInCart.qty += 1;
      cart.totalPrice += product.price

    }
  }

  console.log(this.cart)
    
    

    
  
};

UserSchema.methods.removeFromCart = function (productId) {
  const cart = this.cart;
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

export default mongoose.model("User", UserSchema);
