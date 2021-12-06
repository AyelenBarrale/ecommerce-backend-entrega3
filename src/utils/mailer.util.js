import { createTransport } from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporterGmail = createTransport({
  service: "gmail",
  port: process.env.PORT,
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});
