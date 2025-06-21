import axios from "axios";
import { FRANKFURTER_BASE_URL } from "../utils/constants";
import { Currency } from "../types";
import { getErrorMessage } from "../utils/error";

export async function fetchLatestRates(base: Currency) {
  try {
    const { data } = await axios.get(`${FRANKFURTER_BASE_URL}/latest`, {
      params: { base },
    });
    return data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err));
  }
}

export async function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency
) {
  try {
    const { data } = await axios.get(`${FRANKFURTER_BASE_URL}/latest`, {
      params: { amount, from, to },
    });
    return data;
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err));
  }
}

export async function fetchHistoricalRates(
  start_date: string,
  end_date: string,
  base: Currency,
  page: number,
  pageSize: number
) {
  try {
    const { data } = await axios.get(
      `${FRANKFURTER_BASE_URL}/${start_date}..${end_date}`,
      { params: { base } }
    );
    const rates = data.rates;
    const dates = Object.keys(rates).sort();
    const paginatedDates = dates.slice((page - 1) * pageSize, page * pageSize);
    const paginatedRates = paginatedDates.map((date) => ({
      date,
      rates: rates[date],
    }));
    return {
      base: data.base,
      start_date,
      end_date,
      page,
      pageSize,
      total: dates.length,
      data: paginatedRates,
    };
  } catch (err: unknown) {
    throw new Error(getErrorMessage(err));
  }
}
