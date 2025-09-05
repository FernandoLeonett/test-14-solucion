import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import itemsRouter from "./routes/items.js";
import statsRouter from "./routes/stats.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/items", itemsRouter);
app.use("/api/stats", statsRouter);

// Not Found + Error
app.use("*", notFound);
app.use(errorHandler);

export default app;
