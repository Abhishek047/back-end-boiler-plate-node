import supertest from "supertest"
import { app } from "../server"

describe("Testing app", () => {
    it("app should be running", async () => {
        const response = await supertest(app).get('/');
        expect(response.status).toBe(200)
    })
})