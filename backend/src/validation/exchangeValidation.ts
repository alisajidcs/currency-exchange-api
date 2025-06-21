import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { CURRENCY_LIST, EXCLUDED_CURRENCIES } from "../utils/constants";
import { errorResponse } from "../utils/handlers";

export function validateZod(
  schema: z.ZodTypeAny,
  property: "body" | "query" | "params"
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[property]);
    if (!result.success) {
      const message = result.error.errors[0]?.message || "Invalid request";
      errorResponse(res, message, 400);
      return;
    }
    next();
  };
}

export const latestRatesSchema = z.object({
  base: z
    .string()
    .toUpperCase()
    .pipe(
      z.enum([...(CURRENCY_LIST as [string, ...string[]])], {
        message: "Invalid currency",
      })
    ),
});

export const convertSchema = z
  .object({
    amount: z.number().positive(),
    from: z
      .string()
      .toUpperCase()
      .pipe(
        z.enum([...(CURRENCY_LIST as [string, ...string[]])], {
          message: "Invalid 'from' currency",
        })
      ),
    to: z
      .string()
      .toUpperCase()
      .pipe(
        z.enum([...(CURRENCY_LIST as [string, ...string[]])], {
          message: "Invalid 'to' urrency",
        })
      ),
  })
  .refine(
    (data) =>
      ![data.from, data.to].some((cur) => EXCLUDED_CURRENCIES.includes(cur)),
    {
      message: `Conversions involving ${EXCLUDED_CURRENCIES.join(
        ", "
      )} are not allowed.`,
      path: ["from", "to"],
    }
  );

export const historySchema = z.object({
  start_date: z.string().date(),
  end_date: z.string().date(),
  base: z
    .string()
    .toUpperCase()
    .pipe(
      z.enum([...(CURRENCY_LIST as [string, ...string[]])], {
        message: "Invalid currency",
      })
    ),
  page: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .pipe(z.number().int().min(1).optional()),
  pageSize: z
    .string()
    .optional()
    .transform((v) => (v ? parseInt(v, 10) : undefined))
    .pipe(z.number().int().min(1).max(100).optional()),
});
