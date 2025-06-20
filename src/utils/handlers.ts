import { Request, Response, NextFunction } from "express";

// Type for async Express route handlers
export type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<unknown>;

export const asyncHandler =
  (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

export const errorResponse = (res: Response, message: string, status = 400) => {
  return res.status(status).json({ error: message });
};
