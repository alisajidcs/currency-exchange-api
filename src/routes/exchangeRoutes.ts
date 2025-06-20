import { Router } from "express";

const router = Router();

// routes will go here
router.get("/", (req, res) => {
  res.json({ data: "working" });
});

export default router;
