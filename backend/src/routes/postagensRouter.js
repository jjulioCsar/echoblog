import { Router} from "express";
import {postPostagens, puxarPostagens, puxarPostagemID, postagemAtualizar, deletarPostagem} from "../controllers/postagensController.js";
const router = Router();

router.post("/postagens", postPostagens);
router.get("/postagens", puxarPostagens);
router.get("/postagens/:id", puxarPostagemID);
router.put("/postagens/:id", postagemAtualizar);
router.delete("/postagens/:id", deletarPostagem);

export default router;