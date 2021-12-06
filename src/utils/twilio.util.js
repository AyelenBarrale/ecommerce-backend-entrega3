import twilio from "twilio";
import dotenv from "dotenv";
import { logger } from "../utils/logger.util.js";

dotenv.config();

export const client = twilio(process.env.SID, process.env.TOKEN);


