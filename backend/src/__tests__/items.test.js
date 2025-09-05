import request from "supertest";
import app from "../index.js";

describe("GET /api/items", () => {
  it("should return all items", async () => {
    const res = await request(app).get("/api/items");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
  });

  it("should filter by query", async () => {
    const res = await request(app).get("/api/items?q=Item 1");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("Item 1");
  });

  it("should respect limit", async () => {
    const res = await request(app).get("/api/items?limit=1");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it("should return single item by id", async () => {
    const res = await request(app).get("/api/items/1");
    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Item 1");
  });

  it("should return 404 if item not found", async () => {
    const res = await request(app).get("/api/items/999");
    expect(res.status).toBe(404);
  });
});
