import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  try {
    res.status(200).send("PDF Waffleizer server is running 👀");
    console.log("PDF Waffleizer server is running 👀");
  } catch (error) {
    console.error("Error in base path:", error);
    res.status(500).send("Internal server error");
  }
});

export default router;
