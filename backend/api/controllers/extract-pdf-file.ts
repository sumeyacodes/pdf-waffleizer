import { Request, Response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { execFile } from "child_process";
import fs from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCRIPTS_DIR = path.join(__dirname, "../../scripts");

// no more manually deleting uploaded files :D
async function cleanup(filePath: string) {
  try {
    const UPLOADS_DIR = path.resolve(__dirname, "../../uploads");
    const resolvedPath = path.resolve(filePath);

    if (!resolvedPath.startsWith(UPLOADS_DIR)) {
      console.error("Cleanup error: Attempted to delete a file outside the uploads directory");
      return;
    }

    await fs.unlink(resolvedPath);
  } catch (err) {
    console.error(
      "Cleanup error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}

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

export async function extractPDF(req: Request, res: Response) {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }

  const filePath = req.file.path;

  try {
    // running extraction scripts
    const [markdown, text] = await Promise.all([
      runExtractionScript("extract-markdown.py", filePath),
      runExtractionScript("extract-text.py", filePath),
    ]);

    res.json({ markdown, text });
  } catch (error) {
    const message = error ?? "Processing failed";
    console.error("Error:", message);

    res.status(500).json({ error: "Processing failed. Please try again." });
  } finally {
    await cleanup(filePath);
  }
}
