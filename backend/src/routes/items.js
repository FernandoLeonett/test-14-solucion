import express from "express";
import fs from "fs/promises";
import { DATA_PATH } from "../config.js";

const router = express.Router();

// GET /api/items?q=&limit=
router.get("/", async (req, res, next) => {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    let items = JSON.parse(raw);

    const { q = "", limit } = req.query;
    if (q) items = items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
    if (limit) items = items.slice(0, Number(limit));

    res.json(items);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const items = JSON.parse(raw);
    const item = items.find((i) => i.id === parseInt(req.params.id));
    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }
    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post("/", async (req, res, next) => {
  try {
    const newItem = req.body;
    const raw = await fs.readFile(DATA_PATH, "utf-8");
    const items = JSON.parse(raw);

    newItem.id = Date.now();
    items.push(newItem);

    await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2));
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

export default router;
