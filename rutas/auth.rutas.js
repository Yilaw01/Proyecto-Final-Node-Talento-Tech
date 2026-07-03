import { Router } from "express";
import { loginController } from "../controladores/auth.controller.js";

const router = Router();

//Valida usuario/contraseña y devuelve un Bearer Token
router.post("/login", loginController);

export default router;