"use client";

import React, { useState } from "react";
import { Currency, CurrencyApi, HistoricalRatesResponse } from "../api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const currencies: Currency[] = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "GBP",
  "HKD",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR",
];

export default function HistoricalRates() {
  const [base, setBase] = useState<Currency>("USD");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [result, setResult] = useState<HistoricalRatesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CurrencyApi.getHistoricalRates({
        start_date: startDate,
        end_date: endDate,
        base,
        page,
        pageSize,
      });
      setResult(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error || "Failed to fetch historical rates");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Historical Rates</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4 flex-wrap">
          <div>
            <Label htmlFor="base-currency">Base Currency</Label>
            <Select value={base} onValueChange={(v) => setBase(v as Currency)}>
              <SelectTrigger id="base-currency" className="w-32">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-36"
            />
          </div>
          <div>
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-36"
            />
          </div>
          <div>
            <Label htmlFor="page">Page</Label>
            <Input
              id="page"
              type="number"
              value={page}
              min={1}
              onChange={(e) => setPage(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div>
            <Label htmlFor="page-size">Page Size</Label>
            <Input
              id="page-size"
              type="number"
              value={pageSize}
              min={1}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <Button onClick={fetchHistory} disabled={loading} className="mt-6">
            Fetch
          </Button>
        </div>
        {loading && <p className="mt-4 text-muted-foreground">Loading...</p>}
        {error && <p className="mt-4 text-destructive">{error}</p>}
        {result && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">
              Results for {result.base} ({result.start_date} to{" "}
              {result.end_date}):
            </h4>
            <div className="space-y-4">
              {result.data.map(({ date, rates }) => (
                <div key={date} className="border-b pb-2">
                  <strong>{date}:</strong>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1 mt-1">
                    {Object.entries(rates).map(([cur, rate]) => (
                      <div key={cur} className="flex justify-between">
                        <span>{cur}</span>
                        <span>{rate}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              Page {result.page} of {Math.ceil(result.total / result.pageSize)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
