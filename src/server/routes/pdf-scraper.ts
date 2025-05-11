import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
// import fs from "fs/promises";

// paths for the scripts & the uploaded files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// router & multer config
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/file", upload.single("file"), async (req, res) => {
  if (!req.file) {
   res.status(400).json({ error: "No file uploaded" });
    return;
  }
  
  // uploaded pdf file path
  const filePath = req.file.path;
  
  try {
    // run both text & md extraction scripts
    const [markdown, text] = await Promise.all([
      runPythonScript("extract-md.py", filePath),
      runPythonScript("extract-text.py", filePath)
    ]);
    
    res.json({ markdown, text });
    
    // clean up file after sending response
    // fs.unlink(filePath).catch(err => 
    //   console.error("Failed to delete file:", err)
    // );
    
  } catch (error) {
    console.error("PDF extraction error:", error, error);
    res.status(500).json({ error: "🔴 Processing failed" });
    
    // clean up on error
    // fs.unlink(filePath).catch(() => {});
  }
});

// helper function to run python scripts (child process exec instead of spawn)
async function runPythonScript(scriptName: string, filePath: string) {
  const scriptPath = path.join(__dirname, "../../../src/scripts", scriptName);
  
  return new Promise((resolve, reject) => {
    exec(`python3 "${scriptPath}" "${filePath}"`, (error, stdout) => {
      if (error) return reject(error);
      resolve(stdout.trim());
    });
  });
}

export default router;