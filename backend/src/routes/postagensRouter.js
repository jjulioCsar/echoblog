import { Router} from "express";
import {postPostagens, puxarPostagens, puxarPostagemID} from "../controllers/postagensController.js";
const router = Router();

router.post("/postagens", postPostagens);
router.get("/postagens", puxarPostagens);
router.get("/postagens/:id", puxarPostagemID);

export default router;