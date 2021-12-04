import { Router } from "express";
import {
  getCart,
  createCart,
  deleteCart,
  postProdsCart,
  deleteProductCart,
} from "../controllers/cart.controller.js";


const router = Router();

router.get("/carrito/:id/productos", getCart);
router.post("/carrito/create", createCart);
router.delete("/carrito/:id", deleteCart);
router.post("/carrito/:id/productos", postProdsCart);
router.delete("/carrito/:id/productos/:id_prod", deleteProductCart);

export default router;