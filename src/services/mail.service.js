import User from "../models/user.model.js";
import { logger } from "../utils/logger.util.js";
import { transporterGmail } from "../utils/mailer.util.js";

export async function sendEmailNewUser(data) {
  try {
    let usuario = await User.findOne(data);
    const mailOptions = {
      from: process.env.AUTH_USER,
      to: process.env.AUTH_USER,
      subject: "Nuevo registro",
      html: `
            <h1>Se ha registrado un nuevo usuario</h1>
            <br></br>
            <p>username: ${usuario.username} </p>
            <p>E-mail: ${usuario.email} </p>
            <p>Nombre: ${usuario.firstName} </p>
            <p>Apellido: ${usuario.lastName} </p>
          `,
    };
    const response = await transporterGmail.sendMail(mailOptions);
    logger.info(response);
    return response;
  } catch (error) {
    logger.error(error.message);
  }
}


export async function sendEmailToUser(data) {
  try {
    let usuario = await User.findOne(data);
    const mailOptions = {
      from: process.env.AUTH_USER,
      to: process.env.AUTH_USER,
      subject: `Nuevo pedido de ${usuario.username}, correo: ${usuario.email} `,
      html: `
            <h2>Listado de productos</h2>
            <br></br>
            <p>username: ${usuario.cart.productos} </p>
          `,
    };
    const response = await transporterGmail.sendMail(mailOptions);
    logger.info(response);
    return response;
  } catch (error) {
    logger.error(error.message);
  }
}