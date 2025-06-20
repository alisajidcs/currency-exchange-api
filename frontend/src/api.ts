// Types for backend API
export type Currency =
  | "EUR"
  | "AUD"
  | "BGN"
  | "BRL"
  | "CAD"
  | "CHF"
  | "CNY"
  | "CZK"
  | "DKK"
  | "GBP"
  | "HKD"
  | "HUF"
  | "IDR"
  | "ILS"
  | "INR"
  | "ISK"
  | "JPY"
  | "KRW"
  | "MXN"
  | "MYR"
  | "NOK"
  | "NZD"
  | "PHP"
  | "PLN"
  | "RON"
  | "SEK"
  | "SGD"
  | "THB"
  | "TRY"
  | "USD"
  | "ZAR";

export interface ErrorResponse {
  error: string;
  message?: string;
}

// /latest/:base
export interface LatestRatesResponse {
  amount: number;
  base: Currency;
  date: string;
  rates: Record<Currency, number>;
}

// /convert
export interface ConvertCurrencyRequest {
  amount: number;
  from: Currency;
  to: Currency;
}
export interface ConvertCurrencyResponse {
  amount: number;
  base: Currency;
  date: string;
  rates: Record<Currency, number>;
}

// /history
export interface HistoricalRatesRequest {
  start_date: string;
  end_date: string;
  base: Currency;
  page?: number;
  pageSize?: number;
}
export interface HistoricalRatesResponse {
  base: Currency;
  start_date: string;
  end_date: string;
  page: number;
  pageSize: number;
  total: number;
  data: { date: string; rates: Record<Currency, number> }[];
}

// API interface
const BASE_URL = "http://localhost:3001/api";

export class CurrencyApi {
  static async getLatestRates(base: Currency): Promise<LatestRatesResponse> {
    const res = await fetch(`${BASE_URL}/latest/${base}`);
    if (!res.ok) throw await res.json();
    return res.json();
  }

  static async convertCurrency(
    req: ConvertCurrencyRequest
  ): Promise<ConvertCurrencyResponse> {
    const res = await fetch(`${BASE_URL}/convert`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  }

  static async getHistoricalRates(
    req: HistoricalRatesRequest
  ): Promise<HistoricalRatesResponse> {
    const params = new URLSearchParams({
      start_date: req.start_date,
      end_date: req.end_date,
      base: req.base,
      page: String(req.page ?? 1),
      pageSize: String(req.pageSize ?? 10),
    });
    const res = await fetch(`${BASE_URL}/history?${params}`);
    if (!res.ok) throw await res.json();
    return res.json();
  }
}
