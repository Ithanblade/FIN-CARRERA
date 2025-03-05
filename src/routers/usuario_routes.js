import { Router } from "express";
import { detalleUsuario, login } from "../controllers/usuario_controller.js";
import verificarAutenticacion from "../middlewares/autenticacion.js";

const router = Router();



router.post("/login", login);
router.get("/perfil", verificarAutenticacion,detalleUsuario);

export default router;