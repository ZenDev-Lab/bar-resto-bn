import { PrismaClient } from "@prisma/client";
import request from "supertest";
import express from "express";
import { register } from "../controllers/auth/register";

// Mock PrismaClient
jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    users: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };
  return {
    PrismaClient: jest.fn(() => mPrismaClient),
  };
});

describe("POST /register", () => {
  let app: express.Express;
  let prisma: PrismaClient;
  let consoleErrorMock: jest.SpyInstance;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.post("/api/v1/auth/register", register);
    prisma = new PrismaClient(); 

    // Mock console.error to suppress error logs
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore the original console.error after all tests
    consoleErrorMock.mockRestore();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user successfully", async () => {
    const mockUser = {
      username: "testuser",
      firstName: "Test",
      lastName: "User",
      email: "testuser@example.com",
      age: 25,
      role: "user",
      contract: "permanent",
      phoneNumber: "1234567890",
      password: "password123",
    };

    // Mock Prisma response
    (prisma.users.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.users.create as jest.Mock).mockResolvedValue({
      ...mockUser,
      id: "1",
      password: "hashedpassword", 
    });

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.newUser).toHaveProperty("id");
    expect(response.body.newUser).not.toHaveProperty("password");
  });

  it("should return 401 if the user already exists", async () => {
    const mockUser = {
      username: "existinguser",
      firstName: "Existing",
      lastName: "User",
      email: "existinguser@example.com",
      age: 30,
      role: "user",
      contract: "permanent",
      phoneNumber: "0987654321",
      password: "password123",
    };

    // Mock Prisma response
    (prisma.users.findFirst as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User already exists");
  });

  it("should return 500 if there is an internal server error", async () => {
    const mockUser = {
      username: "erroruser",
      firstName: "Error",
      lastName: "User",
      email: "erroruser@example.com",
      age: 35,
      role: "user",
      contract: "permanent",
      phoneNumber: "1122334455",
      password: "password123",
    };

    // Mock Prisma throwing an error
    (prisma.users.findFirst as jest.Mock).mockRejectedValue(
      new Error("Unexpected error")
    );

    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(mockUser)
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Internal server error");
    expect(response.body.error).toBe("Error");
  });
});
