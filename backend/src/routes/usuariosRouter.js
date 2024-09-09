import AuthMiddleware from "../helpers/authenticatioMiddleware.js"
import { Router} from "express";
import {postUsuarios, loginUsuario, updateUsuario, listarUsuarios} from "../controllers/usuariosController.js";
const router = Router();

// Rotas de usuários
router.post("/usuarios/registro", postUsuarios);
router.post("/usuarios/login", loginUsuario);
router.put("/usuarios/:id", updateUsuario)
router.get('/usuarios', AuthMiddleware, listarUsuarios);

export default router;