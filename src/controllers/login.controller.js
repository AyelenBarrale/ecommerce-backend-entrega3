import { logger } from "../utils/logger.util.js";
import * as userService from "../services/login.service.js";

export async function renderSignUpForm(req, res) {
  try {
    logger.info("acceso a main page");
    res.render("main");
  } catch (error) {
    logger.error("error al renderizar main page");
    res.status(400).send(error.message);
  }
}

export async function signup(req, res) {
  const { body } = req;

  try {
    const usuario = await userService.signup(body);
    req.session.user = usuario;
    //logger.info(req.session)
    //logger.info(req.session.user)
    req.session.admin = true;
    res.render("welcome", { usuario: req.session.user });
  } catch (error) {
    logger.info("Credenciales no válidas");
    res.render("failLog", {});
  }
}

export async function renderSignInForm(req, res) {
  try {
    res.render("signin");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function signin(req, res) {
  const { username, password } = req.body;

  try {
    const usuario = await userService.signin({ username, password });
    if (usuario) {
      req.session.user = usuario;
      req.session.admin = true;
      res.render("welcome", { usuario: req.session.user });
    } else {
      logger.info("Credenciales no válidas");
      res.render("failLog", {});
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}


export async function renderWelcome(req, res) {
  try {
    logger.info("bienvenido");
    res.render("welcome", { usuario: req.session.user });
  } catch (error) {
    logger.error("no se pudo ejecutar el acceso");
    res.status(400).send(error.message);
  }
}

export async function renderLogout(req, res) {
  try {
    logger.info("deslogueo satisfactorio");
    res.render("logout", { usuario: req.session.user });
  } catch (error) {
    logger.error("no se pudo ejecutar el deslogueo");
    res.status(400).send(error.message);
  }
}

export async function logout(req, res) {
  try {
    res.render("logout", { usuario: req.session.user });
    req.session.destroy((err) => {
      if (!err) {
        logger.info("logout realizado");
      } else {
        res.json({ message: err });
      }
    });
  } catch (error) {
    logger.error("no se pudo ejecutar el deslogueo");
    res.status(400).send(error.message);
  }
}

export async function returnHome(req, res) {
  try {
    res.render("/");
  } catch (error) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
}
