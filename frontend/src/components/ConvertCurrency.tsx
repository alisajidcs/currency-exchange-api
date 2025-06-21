"use client";

import React, { useState } from "react";
import { Currency, CurrencyApi, ConvertCurrencyResponse } from "../api";
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
import { CURRENCY_LIST } from "../lib/utils";

export default function ConvertCurrency() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState<Currency>("USD");
  const [to, setTo] = useState<Currency>("EUR");
  const [result, setResult] = useState<ConvertCurrencyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await CurrencyApi.convertCurrency({ amount, from, to });
      setResult(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.error || "Failed to convert currency");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Convert Currency</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-4 flex-wrap">
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              min={0}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-32"
            />
          </div>
          <div>
            <Label htmlFor="from-currency">From</Label>
            <Select value={from} onValueChange={(v) => setFrom(v as Currency)}>
              <SelectTrigger id="from-currency" className="w-32">
                <SelectValue placeholder="From" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_LIST.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="to-currency">To</Label>
            <Select value={to} onValueChange={(v) => setTo(v as Currency)}>
              <SelectTrigger id="to-currency" className="w-32">
                <SelectValue placeholder="To" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCY_LIST.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleConvert} disabled={loading} className="mt-6">
            Convert
          </Button>
        </div>
        {loading && <p className="mt-4 text-muted-foreground">Loading...</p>}
        {error && <p className="mt-4 text-destructive">{error}</p>}
        {result && (
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Result:</h4>
            <p>
              {result.amount} {result.base} = {result.rates[to]} {to} (as of{" "}
              {result.date})
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
