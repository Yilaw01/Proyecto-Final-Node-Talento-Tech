import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct
} from "../controladores/products.controller.js";
 
import { verifyToken } from "../middlewares/auth.middleware.js";
 
const router = Router();
 
// Rutas de lectura: públicas, no requieren estar logueado
router.get("/", getProducts);
router.get("/:id", getProductById);

// Rutas de escritura: privadas, requieren JWT válido
router.post("/create", verifyToken, createProduct);
router.delete("/:id", verifyToken, deleteProduct);
 
export default router;