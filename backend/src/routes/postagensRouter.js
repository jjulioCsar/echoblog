import { Router} from "express";
import {postPostagens} from "../controllers/postagensController.js";
const router = Router();

router.post("/postagens", postPostagens);
export default router;