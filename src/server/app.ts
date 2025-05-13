import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import healthCheck from "./routes/health-check";
import audioRouter from "./routes/generate-audio";
import pdfRouter from "./routes/extract-pdf";

const app = express();

// cors - allow prod and dev urls
const LOCAL_DEV_URL = `http://localhost:5173`;
const LOCAL_PROD_URL = `http://localhost:4173`;
const PROD_URL = "https://pdf-waffleizer.vercel.app";
const allowedOrigins = [LOCAL_DEV_URL, PROD_URL, LOCAL_PROD_URL];
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
const PORT = 3000;
app.listen(PORT, (error?: Error) => {
  if (!error) {
    console.log(`Server is successfully running on port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
