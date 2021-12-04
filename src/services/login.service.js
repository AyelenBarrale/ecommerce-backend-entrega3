import User from "../models/user.model.js";

export async function signup(data) {
  try {
    const usuario = await User.findOne(data);
    if (!usuario) {
      const newUser = new User(data);
      await newUser.save();
    } else {
      return usuario;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function signin(data) {
  try {
    const usuario = await User.findOne(data);
    return usuario;
  } catch (error) {
    throw new Error(error);
  }
}

