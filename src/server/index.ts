import express from "express";
import cors from "cors";
import morgan from "morgan";
import scrapeRouter from "./routes/pdf-scraper";

const CLIENT_PORT = process.env.CLIENT_PORT || 5173;
const SERVER_PORT = process.env.SERVER_PORT || 3000;

const app = express();

// MIDDLEWARE

// cors - needs to allow url making the request or server will block it
// need to check if there is better way to do this (best practices for security)
// for now, just allow localhost and vercel
app.use(
  cors({
    origin: [
      `http://localhost:${CLIENT_PORT}", "https://pdf-waffleizer.vercel.app`,
    ],
  })
);
// morgan - for logging in terminal
app.use(morgan("dev"));
// parsing json
app.use(express.json());
// subroute for scraping
app.use("/scrape", scrapeRouter);

app.listen(SERVER_PORT, () =>
  console.log(`Server listening on http://localhost:${SERVER_PORT}`)
);
