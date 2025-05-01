import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

// plan

// file is uploaded
// updates file state in tanstack query
// query calls api endpoint
// api endpoint calls python script
// python script scrapes the file
// python script returns mdx file and saves in assets folder
// mdx file is imported in view-pdf.tsx to display

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 pdf‑scraper router initialized");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "❌ No file uploaded" });
    return;
  }

  const filePath = req.file.path;
  const scrapeScript = path.join(
    __dirname,
    "../../../src/scraper/file-script.py"
  );
  const py = spawn("python3", [scrapeScript, filePath]);

  py.on("error", (err) => {
    console.error("🚫 Failed to start Python:", err);
    return res.status(500).json({ error: "🚫 Failed to start PDF processing" });
  });

  py.on("close", (code) => {
    if (code === 0) {
      return res
        .status(200)
        .json({ message: "✅ File processed successfully" });
    } else {
      return res
        .status(500)
        .json({ error: `🚫 PDF processing exited with code ${code}` });
    }
  });
});

export default router;
