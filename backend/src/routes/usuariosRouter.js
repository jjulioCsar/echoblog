import { Router} from "express";
import {postUsuarios, loginUsuario} from "../controllers/usuariosController.js";
const router = Router();

// Rotas de usuários
router.post("/usuarios/registro", postUsuarios);
router.post("/usuarios/login", loginUsuario);

export default router;