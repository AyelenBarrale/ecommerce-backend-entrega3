import User from "../models/user.model.js";
import Carrito from "../models/carts.model.js"
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

  const idCart = data
  //console.log(idCart);

  const populate = {path: "userId", select: "email username"}
  const populateProds = {path: "productos.productId", select: "nombre precio"}


  try {
    let carrito = await Carrito.findById(idCart).populate(populate).populate(populateProds).exec()

    let list = carrito.productos
    //console.log(list);
    let arrayItems = "";
    let n;
    for(n in list ) {
      /* arrayItems += "<li>" + list[n].nombre + "- $" + list[n].precio + "</li>" */
      arrayItems += "<li>" + list[n] + "</li>"
    }

    const mailOptions = {
      from: process.env.AUTH_USER,
      to: process.env.AUTH_USER,
      subject: `Nuevo pedido de ${carrito.userId.username}, correo: ${carrito.userId.email} `,
      html: `
            <h2>Listado de productos</h2>
            <br></br>
            <ul> ${arrayItems} </ul>
          `,
    };
    const response = await transporterGmail.sendMail(mailOptions);
    logger.info(response);
    return response;
  } catch (error) {
    logger.error(error.message);
  }
}

//sendEmailToUser("61b9b5d5cdb987b1daf9b8cb")