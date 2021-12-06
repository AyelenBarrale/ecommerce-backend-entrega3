import User from "../models/user.model.js";
import { logger } from "../utils/logger.util.js";
import { client } from "../utils/twilio.util.js"


export async function sendSMS(data) {
    try {
        let usuario = await User.findOne(data);
      const message = {
        body: "Su pedido ha sido recibido y se encuentra en proceso",
        from: "+18507712325",
        to: usuario.phone ,
      };
      const response = await client.messages.create(message);
      logger.info("SMS=>", response);
    } catch (error) {
      logger.error(error.message);
    }
  }
  

  export async function sendWP(data) {
    try {
        let usuario = await User.findOne(data);
      const message = {
        body: `Nuevo pedido de ${usuario.username} , correo: ${usuario.email} `,
        from: "whatsapp:+14155238886",
        to: "whatsapp:+543517482790",
      };
      const response = await client.messages.create(message);
      logger.info("Whatsapp=>", response);
    } catch (error) {
      logger.error(error.message);
    }
  }