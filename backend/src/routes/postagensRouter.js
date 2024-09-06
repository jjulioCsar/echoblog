import { Router} from "express";
import {postPostagens, puxarPostagens, puxarPostagemID, postagemAtualizar} from "../controllers/postagensController.js";
const router = Router();

router.post("/postagens", postPostagens);
router.get("/postagens", puxarPostagens);
router.get("/postagens/:id", puxarPostagemID);
router.put("/postagens/:id", postagemAtualizar);

export default router;