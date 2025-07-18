import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import healthCheck from "./api/routes/health-check";
import audioRouter from "./api/routes/generate-audio";
import pdfRouter from "./api/routes/extract-pdf";
import "dotenv/config";

const app = express();

// cors - allow prod and dev urls
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://pdf-waffleizer.vercel.app",
];

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

//middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());

// routes
app.use("/", healthCheck);
app.use("/extract-pdf", pdfRouter);
app.use("/audio", audioRouter);

// initialise server
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error?: Error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
