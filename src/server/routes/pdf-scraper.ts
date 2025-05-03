/**  
 INITIAL PLAN:

  file is uploaded
  updates file state in tanstack query
  query calls api endpoint
  api endpoint calls python script
  python script scrapes the file
  python script returns mdx file and saves in assets folder
  mdx file is imported in view-pdf.tsx to display
**/

import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

// gets the absolute path of the current file (esm)
const __filename = fileURLToPath(import.meta.url);
console.log("📂 __filename:", __filename);
// gets the absolute path of the current directory (esm)
const __dirname = path.dirname(__filename);
console.log("📂 __dirname:", __dirname);

// Calculate the correct path to the assets directory relative to this file
const assetsDir = path.resolve(__dirname, "../../../src/assets");
console.log("📂 Assets directory:", assetsDir); // Log the calculated assets path

// EXPRESS ROUTER
const router = express.Router();
console.log("🔍 PDF SCRAPER ROUTER INITIALIZED");

// MIDDLEWARE:
// intialises multer & saves the file to the /uploads directory
// codeql alerted this as security issue because http requests that interact with filesystem should have rate limit
const upload = multer({ dest: "uploads/" });

// POST REQUEST:
// multer middleware intercepts requests and handles the file upload
router.post("/file", upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({
      error: "❌ No file uploaded",
    });
    console.error("❌ No file uploaded");
    return;
  }

  // get the file path and filename from request
  const filePath = req.file.path;
  const pdfBase = req.file.filename;
  const outputFilename = `${pdfBase}.mdx`;
  // Construct the full path for the output file
  const outputPath = path.join(assetsDir, outputFilename);

  // creating an absolute path to a Python script file called file-script.py
  // ensure the path works regardless of where the script is run from
  const scrapeScript = path.join(
    __dirname,
    "../../../src/scraper/file-script.py"
  );

  // launches 'python3' as separate process & passes it three arguments:
  //    1. The path to the script it should execute (scrapeScript).
  //    2. The path to the uploaded PDF file for scraper script to process.
  //    3. The desired absolute output path for the .mdx file.
  const py = spawn("python3", [scrapeScript, filePath, outputPath]); // Pass outputPath

  // Capture stderr for debugging Python script errors
  let stderr = "";
  py.stderr.on("data", (data) => {
    stderr += data.toString();
  });

  // triggered when Python process terminates, regardless of exit code
  py.on("close", (code) => {
    // Exit code 0: indicates success per UNIX conventions
    if (code === 0) {
      console.log(
        `✅ Python script finished successfully for ${outputFilename}`
      );
      return res.status(200).json({
        message: "✅ File processed successfully",
        filename: outputFilename, // Send back just the filename
      });
    } else {
      // non-zero codes indicate script failures:
      // - 1: generic error in script
      // - 2: PDF parsing errors
      // - other: potential python environment issues
      console.error(`🚫 PDF processing failed with exit code: ${code}`);
      console.error(`🐍 Python stderr: ${stderr}`); // Log Python errors
      return res.status(500).json({
        error: `🚫 PDF processing failed (code ${code})`,
        details: stderr, // Optionally send Python errors back
      });
    }
  });
});

export default router;
