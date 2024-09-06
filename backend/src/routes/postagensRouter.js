import { Router} from "express";
import {postPostagens, puxarPostagens, puxarPostagemID, postagemAtualizar, deletarPostagem, atualizarImagemPostagem} from "../controllers/postagensController.js";
import upload from "../helpers/uploadMiddleware.js";
const router = Router();

router.post("/postagens", postPostagens);
router.get("/postagens", puxarPostagens);
router.get("/postagens/:id", puxarPostagemID);
router.put("/postagens/:id", postagemAtualizar);
router.delete("/postagens/:id", deletarPostagem);
router.post("/postagens/:id/imagem", upload.single("imagem"), atualizarImagemPostagem);

export default router;