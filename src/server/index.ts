import express from "express";
import cors from "cors";
import morgan from "morgan";
import scrapeRouter from "./routes/pdf-scraper";

const LOCAL_CLIENT_URL = `http://localhost:5173`;
const PROD_URL = "https://pdf-waffleizer.vercel.app";
const allowedOrigins = [LOCAL_CLIENT_URL, PROD_URL];

const app = express();

// MIDDLEWARE

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
// subroute for scraping
app.use("/scrape", scrapeRouter);

// Bind to 0.0.0.0 so Render’s router can reach it
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on port ${PORT}`);
});
