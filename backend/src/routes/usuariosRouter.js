import { Router} from "express";
import {postUsuarios} from "../controllers/usuariosController.js";
const router = Router();

// Rotas de usuários
router.post("/usuarios/registro", postUsuarios); 

export default router;