import express from "express";
import multer from "multer";
import os from "os";
import { extractPDF } from "../controllers/extract-pdf-file";

const router = express.Router();
const upload = multer({ dest: os.tmpdir() }); // temp location to save uploaded files

router.post("/file", upload.single("file"), extractPDF);

export default router;
