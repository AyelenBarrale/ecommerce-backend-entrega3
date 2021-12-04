import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/prods.controller.js";

const router = Router();

router.get("/productos", getProducts);
router.get("/productos/:id?", getProductById);
router.post("/upload", createProduct);
router.put("/productos/:id", updateProduct);
router.delete("/productos/:id", deleteProduct);

export default router;
