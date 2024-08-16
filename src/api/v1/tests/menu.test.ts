import request from "supertest";
import express from "express";
import { PrismaClient } from "@prisma/client";
import menuRoute from "../routes/menuRoute";

const prisma = new PrismaClient();

describe("Menu Controller Tests", () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use("/menu", menuRoute);
  });

  it("Should create a new menu item", async () => {
    const response = await request(app)
      .post("/menu")  
      .send({ name: "Pizza", price: "10.00", quantity: "100" })
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body).toHaveProperty(
      "message",
      "Menu item created successfully"
    );
    expect(response.body.menuItem).toHaveProperty("name", "Pizza");
  });

  it("Should return all menu items", async () => {
    await request(app)
      .post("/menu")  
      .send({ name: "Burger", price: "5.00", quantity: "50" });

    const response = await request(app)
      .get("/menu")  
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Pizza" }),
        expect.objectContaining({ name: "Burger" }),
      ])
    );
  });

  it("Should update an existing menu item", async () => {
    const createdItem = await prisma.menu.create({
      data: { name: "Pasta", price: "7.00", quantity: "20" },
    });

    const response = await request(app)
      .put(`/menu/${createdItem.itemId}`)  
      .send({ name: "Spaghetti", price: "8.00", quantity: "25" })
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Menu item updated successfully"
    );
    expect(response.body.menuItem).toHaveProperty("name", "Spaghetti");
  });

  it("Should delete a menu item", async () => {
    const createdItem = await prisma.menu.create({
      data: { name: "Salad", price: "6.00", quantity: "30" },
    });

    const response = await request(app)
      .delete(`/menu/${createdItem.itemId}`)  
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Menu item deleted successfully"
    );
  });
});
