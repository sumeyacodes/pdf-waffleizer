import express from "express";
import cors from "cors";
import morgan from "morgan";
import pdfScrapeRouter from "./routes/pdf-scraper";
import baseRouter from "./routes/test";
import ttsRouter from "./routes/generate-audio";

const LOCAL_DEV_URL = `http://localhost:5173`;
const LOCAL_PROD_URL = `http://localhost:4173`;
const PROD_URL = "https://pdf-waffleizer.vercel.app";
const allowedOrigins = [LOCAL_DEV_URL, PROD_URL, LOCAL_PROD_URL];

const app = express();

// app.use(express.urlencoded({ extended: true }));

// MIDDLEWARE
// allow cors for local dev and prod urls
app.use(
  cors({
    origin: (incomingOrigin, callback) => {
      if (!incomingOrigin || allowedOrigins.includes(incomingOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS denied"), false);
      }
    },
  })
);

// morgan - for logging in terminal
app.use(morgan("dev"));
// parsing json
app.use(express.json());

// ROUTES
// health-check endpoint
app.use("/", baseRouter);
// subroute for scraping
app.use("/scrape", pdfScrapeRouter);
// subroute for text-to-speech
app.use("/tts", ttsRouter);

const PORT = 3000;

app.listen(PORT, (error?: Error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
