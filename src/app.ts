import express from "express";
import exchangeRoutes from "./routes/exchangeRoutes";
import { errorResponse } from "./utils/handlers";

const app = express();

app.use(express.json());

// API routes
app.use("/api", exchangeRoutes);

// Health check
app.get("/", (_req, res) => {
  res.send("Currency Exchange API is running!");
});

// Global error handler
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err.stack);
    errorResponse(res, "Internal server error", 500);
  }
);

export default app;
