import { Router } from "express";
import {
  getLatestRates,
  convertCurrency,
  getHistoricalRates,
} from "../controllers/exchangeController";

const router = Router();

router.get("/latest/:base", getLatestRates);
router.post("/convert", convertCurrency);
router.get("/history", getHistoricalRates);

export default router;
