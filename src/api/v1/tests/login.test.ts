import request from "supertest";
import express from "express";
import login from "../controllers/auth/login";
describe("Get /Login", () => {
  let app: express.Express;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post("/api/v1/auth/login", login);
  });
  it("Should Return UserId and Token", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "frerot", password: "ntwali" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual({
      userId: "ukfjaldf",
      token: "string",
    });
  });
  it("Should Return Bad Req Message When email is missing", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ password: "fajklfja" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({ badreq: "invalid Credentials" });
  });
  it("should return Badreq message when password is missing", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: "test@example.com" })
      .expect("Content-Type", /json/)
      .expect(400);
    expect(response.body).toEqual({
      badreq: "invalid Credentials",
    });
  });
});
