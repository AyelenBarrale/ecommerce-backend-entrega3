import twilio from "twilio";
import dotenv from "dotenv";
import { logger } from "../utils/logger.util.js";

dotenv.config();

export const client = twilio(process.env.SID, process.env.TOKEN);

export async function sendWS(data) {
  const carrito = data;
  //console.log(carrito);

  try {
    const message = {
      body: `Nuevo pedido de ${carrito.userId.username}, correo: ${carrito.userId.email} `,
      from: `whatsapp: +16592013658 `,
      to: `whatsapp: +543517482790 `,
    };
    const response = await client.messages.create(message);
    logger.info("Whatsapp=>", response);
  } catch (error) {
    logger.error(error.message);
  }
}


export async function sendSMS(data) {
    const carrito = data

    try {
    const message = {
      body: "¡Hola! Tu pedido ha sido recibido y se encuentra en proceso",
      from: "+165920136585",
      to: `${carrito.userId.phone}` ,
    };
    const response = await client.messages.create(message);
    logger.info("SMS=>", response);
  } catch (error) {
    logger.error(error.message);
  }
}