import { Request, Response } from "express";
import * as exchangeService from "../services/exchangeService";
import { asyncHandler } from "../utils/handlers";
import { Currency } from "../types";

export const getLatestRates = asyncHandler(
  async (req: Request, res: Response) => {
    const { base } = req.params;
    const data = await exchangeService.fetchLatestRates(base as Currency);
    res.json(data);
  }
);

export const convertCurrency = asyncHandler(
  async (req: Request, res: Response) => {
    const { amount, from, to } = req.body;
    const data = await exchangeService.convertCurrency(
      amount,
      from as Currency,
      to as Currency
    );
    res.json(data);
  }
);

export const getHistoricalRates = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      start_date,
      end_date,
      base = "EUR",
      page = 1,
      pageSize = 10,
    } = req.query;
    const data = await exchangeService.fetchHistoricalRates(
      start_date as string,
      end_date as string,
      base as Currency,
      Number(page),
      Number(pageSize)
    );
    res.json(data);
  }
);
