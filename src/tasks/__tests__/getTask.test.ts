import request from 'supertest';
import { app } from '../../server';

describe("getTask /", () => {
    it("should be 200", async () => {
        const response = await request(app).get("/api/task");
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            success: true
        });
    })
})