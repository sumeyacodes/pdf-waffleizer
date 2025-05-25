import { Router } from "express";
import { generateAudio } from "../controllers/generate-audio";

const router = Router();

router.post("/google-tts", generateAudio);

export default router;
