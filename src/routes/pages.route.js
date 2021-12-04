import { Router } from "express";
import { renderCart, renderDatos, renderFormProds,  } from "../controllers/pages.controller.js"
//import isAdmin from "../middlewares/auth.middleware.js"

const router = Router();


router.get("/datos", renderDatos)
router.get("/upload", /* isAdmin, */ renderFormProds);
router.get("/carrito", renderCart)


export default router;