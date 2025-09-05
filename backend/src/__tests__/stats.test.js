import fs from "fs/promises";
import path from "path";
import request from "supertest";
import { fileURLToPath } from "url";
import app from "../index.js";

// Crear __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock path
const MOCK_DATA = path.join(__dirname, "../../mock-data/items.json");

beforeEach(async () => {
  const mockItems = [
    { id: 1, name: "Item 1", price: 100 },
    { id: 2, name: "Item 2", price: 200 },
  ];
  await fs.writeFile(MOCK_DATA, JSON.stringify(mockItems, null, 2));

  app.locals.DATA_PATH = MOCK_DATA;
});

afterEach(async () => {
  await fs.unlink(MOCK_DATA).catch(() => {});
});

describe("GET /api/stats", () => {
  it("should return total and averagePrice", async () => {
    const res = await request(app).get("/api/stats");
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    expect(res.body.averagePrice).toBe(150);
  });
});
