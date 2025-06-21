import { Router } from "express";
import {
  getLatestRates,
  convertCurrency,
  getHistoricalRates,
} from "../controllers/exchangeController";
import {
  validateZod,
  latestRatesSchema,
  convertSchema,
  historySchema,
} from "../validation/exchangeValidation";

const router = Router();

router.get(
  "/latest/:base",
  validateZod(latestRatesSchema, "params"),
  getLatestRates
);
router.post("/convert", validateZod(convertSchema, "body"), convertCurrency);
router.get("/history", validateZod(historySchema, "query"), getHistoricalRates);

export default router;
