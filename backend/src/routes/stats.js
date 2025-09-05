import express from "express";
import fs from "fs/promises";
import { DATA_PATH } from "../config.js";
import mean from "../utils/stats.js";

const router = express.Router();

let cachedStats = null;
let lastModified = null;

router.get("/", async (req, res, next) => {
  try {
    const statsFile = await fs.stat(DATA_PATH);

    if (!cachedStats || lastModified !== statsFile.mtimeMs) {
      const raw = await fs.readFile(DATA_PATH, "utf-8");
      const items = JSON.parse(raw);

      const total = items.length;
      const averagePrice = mean(items.map((i) => i.price));

      cachedStats = { total, averagePrice };
      lastModified = statsFile.mtimeMs;
    }

    res.json(cachedStats);
  } catch (err) {
    next(err);
  }
});

export default router;
