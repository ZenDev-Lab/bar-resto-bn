import request from "supertest";
import express, { Express } from "express";
import login from "../controllers/auth/loginUser";
import verifyUser from "../middlewares/verifyUser";
import prisma from "../utils/connectDb";
import brcypt from "bcrypt";

describe("Get /Login", () => {
  let app: Express;

  beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.post("/api/v1/auth/login", verifyUser, login);
    await prisma.users.deleteMany({
      where: {
        username: "testusername",
      },
    });
    const testpassword = await brcypt.hash("testpassword", 12);

    await prisma.users.create({
      data: {
        email: "test@gmail.com",
        contract:
          "https://file-examples.com/storage/fe519944ff66ba53b99c446/2017/10/file-sample_150kB.pdf",
        firstName: "test firstname",
        lastName: "test lastname",
        password: testpassword,
        phoneNumber: "+493849302043",
        username: "testusername",
        profile: "profile-picture-url",
      },
    });
  });

  it("Return user-details with token on success user Credentials", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ username: "testusername", password: "testpassword" })
      .expect("Content-Type", /json/);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: response.body.token,
      user: {
        username: "testusername",
        profile: "profile-picture-url",
      },
    });
  });

  it("Should Return Invalid Credentials on wrong password or username", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ username: "testwrong", password: "testwrongpassword" })
      .expect("Content-Type", /json/)
      .expect(401);
    expect(response.body).toEqual({
      error: "Invalid Credentials",
      message: "Enter Correct Username or Password",
    });
  });

  it("Should return Required data on missing of password or username", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ eusername: "missingpassword" })
      .expect("Content-Type", /json/)
      .expect(401);
    expect(response.body).toEqual({
      error: "Required data",
      message: "username and password are required",
    });
  });

  afterAll(async () => {
    await prisma.users.deleteMany({
      where: {
        username: "testusername",
      },
    });
  });
});
