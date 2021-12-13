import { Router } from "express";
import {
  getCart,
  createCart,
  deleteCart,
  addToCart,
  deleteProductCart,
} from "../controllers/cart.controller.js";


const router = Router();
/* 
router.post("/add-to-cart", addToCart)
router.get("/carrito", getCart)
router.post("/delete-cart", deleteInCart) */



router.post("/add-to-cart", addToCart);

router.get("/carrito/:id/productos", getCart);
router.post("/carrito", createCart);
router.delete("/carrito/:id", deleteCart);
router.delete("/carrito/:id/productos/:id_prod", deleteProductCart);

export default router;
