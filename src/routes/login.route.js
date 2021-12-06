import { Router } from "express";
import {
  /* failLog, */
  renderSignUpForm,
  signup,
  renderSignInForm,
  signin,
  renderWelcome,
  /* renderLogout, */
  logout,
  returnHome,
} from "../controllers/login.controller.js";


const router = Router();

router.get("/", renderSignUpForm);

//router.get("/", failLog);

router.post("/welcome", signup);

router.get("/signin", renderSignInForm);

router.get("/welcome", renderWelcome);

router.post("/welcome", signin);

//router.get("/logout", renderLogout);

router.post("/logout", logout);

router.get("/", returnHome)

export default router;
