import twilio from "twilio";
import dotenv from "dotenv";
import { logger } from "../utils/logger.util.js";

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

//TODO: configurar bien
async function sendSMS() {
  try {
    const message = {
      body: "Su pedido ha sido recibido y se encuentra en proceso",
      from: "+18507712325",
      to: process.argv[2],
    };
    const response = await client.messages.create(message);
    logger.info("SMS=>", response);
  } catch (error) {
    logger.error(error.message);
  }
}

//TODO: configurar bien
async function sendWP() {
  try {
    const message = {
      body: "Nuevo pedido de [nombre] y [mail]",
      from: "whatsapp:+14155238886",
      to: "whatsapp:+543517482790",
    };
    const response = await client.messages.create(message);
    logger.info("Whatsapp=>", response);
  } catch (error) {
    logger.error(error.message);
  }
}
