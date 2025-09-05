import request from "supertest";
import app from "../index.js";

describe("GET /api/stats", () => {
  it("should return total and averagePrice", async () => {
    const res = await request(app).get("/api/stats");
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(2);
    expect(res.body.averagePrice).toBe(150);
  });
});
