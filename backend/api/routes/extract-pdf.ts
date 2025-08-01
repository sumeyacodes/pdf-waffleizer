import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { extractPDF } from "../controllers/extract-pdf-file";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "../../uploads");

fs.mkdir(UPLOADS_DIR, { recursive: true }).catch(console.error);

const upload = multer({ dest: UPLOADS_DIR });

router.post("/file", upload.single("file"), extractPDF);

export default router;
