import express from "express";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import fs from "fs/promises";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCRIPTS_DIR = path.join(__dirname, "../../../src/scripts");

const router = express.Router();

// temp location
const upload = multer({ dest: os.tmpdir() });

// no more manually deleting uploaded files :D
async function cleanup(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(
      "Cleanup error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}

router.post(
  "/file",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    const filePath = req.file.path;

    try {
      // run extraction scripts
      const [markdown, text] = await Promise.all([
        runExtractionScript("extract-markdown.py", filePath),
        runExtractionScript("extract-text.py", filePath),
      ]);
      console.log(markdown, text);
      res.json({ markdown, text });
    } catch (error) {
      const message = error ?? "Processing failed";
      console.error("Error:", message);
      res.status(500).json({ error: "Processing failed. Please try again." });
    } finally {
      await cleanup(filePath);
    }
  }
);

async function runExtractionScript(
  scriptName: string,
  filePath: string
): Promise<string> {
  const scriptPath = path.join(SCRIPTS_DIR, scriptName);

  return new Promise((resolve, reject) => {
    execFile("python3", [scriptPath, filePath], (error, stdout) => {
      if (error) {
        console.error(`Error executing ${scriptName}:`, error);

        return reject(error);
      }

      resolve(stdout.trim());
    });
  });
}

export default router;
