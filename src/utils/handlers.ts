import { Response } from "express";

export const errorResponse = (res: Response, message: string, status = 400) => {
  return res.status(status).json({ error: message });
};
