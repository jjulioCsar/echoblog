import { Router} from "express";
import {postPostagens, puxarPostagens} from "../controllers/postagensController.js";
const router = Router();

router.post("/postagens", postPostagens);
router.get("/postagens", puxarPostagens);

export default router;