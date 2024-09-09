import AuthMiddleware from "../helpers/authenticatioMiddleware.js"
import { Router} from "express";
import {postUsuarios, loginUsuario, updateUsuario, listarUsuarios, deletarUsuario, updatePapelUsuario} from "../controllers/usuariosController.js";
const router = Router();

// Rotas de usuários
router.post("/usuarios/registro", postUsuarios);
router.post("/usuarios/login", loginUsuario);
router.put("/usuarios/:id", updateUsuario)
router.get('/usuarios', AuthMiddleware, listarUsuarios);
router.delete("/usuarios/:id", AuthMiddleware, deletarUsuario)
router.patch("/usuarios/:id/papel", AuthMiddleware, updatePapelUsuario);

export default router;