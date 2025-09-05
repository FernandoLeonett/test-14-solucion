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

  // Sobrescribir DATA_PATH temporalmente
  app.locals.DATA_PATH = MOCK_DATA;
});

afterEach(async () => {
  await fs.unlink(MOCK_DATA).catch(() => {});
});

describe("GET /api/items", () => {
  it("should return all items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("should filter by query", async () => {
    const res = await request(app).get("/api/items?q=item 1");
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Item 1");
  });

  it("should respect limit", async () => {
    const res = await request(app).get("/api/items?limit=1");
    expect(res.body.length).toBe(1);
  });
});
