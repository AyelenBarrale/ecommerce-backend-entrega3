import { logger } from "../utils/logger.util.js";

export async function renderDatos(req, res) {
  try {
    res.render("datos", { usuario: req.session.user });
  } catch (error) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}

export async function renderFormProds(req, res) {
    try {
      res.render("upProducts");
    } catch (error) {
      logger.error(error.message);
      res.status(400).send(error.message);
    }
  }

  export async function renderCart(req, res) {
    try {
      res.render("carrito");
    } catch (error) {
      logger.error(error.message);
      res.status(400).send(error.message);
    }
  }
