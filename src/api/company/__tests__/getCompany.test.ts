import request from "supertest";
import { app, startServer } from "../../../server";
import { DB } from "../../../database/db";

describe("getCompany /", () => {
  beforeAll(async () => {
    await startServer();
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await DB.getInstance().disconnectDatabase();
  });
  it("should be 200", async () => {
    const response = await request(app).get("/api/company");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: true,
    });
  });
});
