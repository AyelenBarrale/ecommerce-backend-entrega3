import { createTransport } from "nodemailer";
import { logger } from "../utils/logger.util.js";
import dotenv from "dotenv";

dotenv.config();

const transporterGmail = createTransport({
  service: "gmail",
  port: process.env.PORT,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

const mailOptions = {
  from: process.env.AUTH_USER,
  to: process.env.AUTH_USER,
  subject: "Nuevo registro",
  html: "<h1>Se ha registrado un nuevo usuario</h1>",
};

export async function sendMailNewRegistro() {
  try {
    const response = await transporterGmail.sendMail(mailOptions);
    logger.info(response);
  } catch (error) {
    logger.error(error.message);
  }
}
