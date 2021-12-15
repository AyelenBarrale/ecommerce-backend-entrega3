import User from "../models/user.model.js";
import Carrito from "../models/carts.model.js"
import { sendEmailNewUser } from "../services/mail.service.js";

export async function signup(data) {
  try {
    const usuario = await User.findOne(data);
    if (!usuario) {
      const newUser = new User(data);
      await newUser.save();
      sendEmailNewUser(newUser);

      //CREATE CART BASED ON USER ID
      const newCarrito = new Carrito({userId: newUser.id});
      await newCarrito.save();

    } else {
      return usuario;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function signin(data) {
  try {
    usuario = await User.findOne(data);
    return usuario;
  } catch (error) {
    throw new Error(error);
  }
}

