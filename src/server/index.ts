import express from "express";
import cors from "cors";
import morgan from "morgan";
import scrapeRouter from "./routes/pdf-scraper";

const app = express();

// MIDDLEWARE

// cors - needs to allow url making the request or server will block it
app.use(cors({ origin: "http://localhost:5173" }));
// morgan - for logging in terminal
app.use(morgan("dev"));
// parsing json
app.use(express.json());
// subroute for scraping
app.use("/scrape", scrapeRouter);

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
