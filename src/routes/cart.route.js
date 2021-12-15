import { Router } from "express";
import { getCarrito, addToCarrito, removeFromCarrito, deleteCarrito, sendPedido } from "../controllers/cart.controller.js";

const router = Router();


/* --------------- TEST WITH CART AND USER INDEPENDENTS MODELS -------------- */

router.get("/carrito/:id/productos", getCarrito);
router.delete("/carrito/:id", deleteCarrito);
router.post("/carrito/:id/productos", addToCarrito);
router.delete("/carrito/:id/productos/:id_prod", removeFromCarrito);
router.post("/pedido/:id", sendPedido)

export default router;
