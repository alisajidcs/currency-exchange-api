"use client";

import React, { useState } from "react";
import { Currency, CurrencyApi, LatestRatesResponse } from "../api";
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

export default function LatestRates() {
  const [base, setBase] = useState<Currency>("USD");
  const [rates, setRates] = useState<LatestRatesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CurrencyApi.getLatestRates(base);
      setRates(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error || "Failed to fetch rates");
      setRates(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Latest Rates</CardTitle>
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
          <Button onClick={fetchRates} disabled={loading} className="mt-6">
            Get Rates
          </Button>
        </div>
        {loading && <p className="mt-4 text-muted-foreground">Loading...</p>}
        {error && <p className="mt-4 text-destructive">{error}</p>}
        {rates && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">
              Rates for {rates.base} (as of {rates.date}):
            </h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1">
              {Object.entries(rates.rates).map(([cur, rate]) => (
                <div key={cur} className="flex justify-between">
                  <span>{cur}</span>
                  <span>{rate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
