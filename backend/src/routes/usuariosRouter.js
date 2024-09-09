import { Router} from "express";
import {postUsuarios, loginUsuario, updateUsuario} from "../controllers/usuariosController.js";
const router = Router();

// Rotas de usuários
router.post("/usuarios/registro", postUsuarios);
router.post("/usuarios/login", loginUsuario);
router.put("/usuarios/:id", updateUsuario)

export default router;