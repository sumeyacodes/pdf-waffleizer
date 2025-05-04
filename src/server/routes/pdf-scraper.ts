import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
// i forgot what these do
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// path to python script for pdf scraping
const scrapeScript = path.join(
  __dirname,
  "../../../src/scraper/file-script.py"
);

// multer uploads file from frontend to server
// codeql alerted security issue because http requests that interact with filesystem should have rate limits
const upload = multer({ dest: "uploads/" });

const router = express.Router();
console.log("🔍 PDF SCRAPER ROUTER INITIALIZED");

router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      error: "❌ No file uploaded",
    });
    console.error("❌ No file uploaded");
    return;
  }

  // run python script
  const py = spawn("python3", [scrapeScript, req.file.path]);

  // capture stdout terminal output of python script (markdown content)
  let stdout = "";
  py.stdout.on("data", (data) => {
    stdout += data.toString();
  });

  // capture stderr for debugging python script errors
  let stderr = "";
  py.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  // triggered when Python process terminates, regardless of exit code
  py.on("close", (code) => {
    if (code === 0) {
      console.log(`✅ PDF processing successful with exit code: ${code}`);

      return res.status(200).json({
        status: `✅ PDF scrape successful: Python exit code ${code}`,
        stderr: stderr, // python script messages
        file: stdout, // markdown content
        upload: req.file?.filename,
      });
    } else {
      console.error(`🚫 PDF processing failed with exit code: ${code}`);

      return res.status(500).json({
        status: `🚫 PDF scrape unsuccessful: Python ${code})`,
        stderr: stderr, // python script messages
        file: null,
        upload: req.file?.filename,
      });
    }
  });
});

export default router;
