import { PrismaClient, RoleType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Define sample user data
  const users = [
    {
      username: "adminUser",
      firstName: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: await bcrypt.hash("adminPassword", 10),
      role: RoleType.admin,
      phoneNumber: "1234567890",
      contract: "Full-time",
    },
    {
      username: "cashierUser",
      firstName: "Cashier",
      lastName: "User",
      email: "cashier@example.com",
      password: await bcrypt.hash("cashierPassword", 10),
      role: RoleType.cashier,
      phoneNumber: "0987654321",
      contract: "Part-time",
    },
    {
      username: "chiefUser",
      firstName: "Chief",
      lastName: "User",
      email: "chief@example.com",
      password: await bcrypt.hash("chiefPassword", 10),
      role: RoleType.chief,
      phoneNumber: "1122334455",
      contract: "Full-time",
    },
    {
      username: "financeUser",
      firstName: "Finance",
      lastName: "User",
      email: "finance@example.com",
      password: await bcrypt.hash("financePassword", 10),
      role: RoleType.finance,
      phoneNumber: "2233445566",
      contract: "Contract",
    },
    {
      username: "beverageUser",
      firstName: "Beverage",
      lastName: "User",
      email: "beverage@example.com",
      password: await bcrypt.hash("beveragePassword", 10),
      role: RoleType.beverage,
      phoneNumber: "3344556677",
      contract: "Part-time",
    },
    {
      username: "stockerUser",
      firstName: "Stocker",
      lastName: "User",
      email: "stocker@example.com",
      password: await bcrypt.hash("stockerPassword", 10),
      role: RoleType.stocker,
      phoneNumber: "4455667788",
      contract: "Full-time",
    },
    {
      username: "waiterUser",
      firstName: "Waiter",
      lastName: "User",
      email: "waiter@example.com",
      password: await bcrypt.hash("waiterPassword", 10),
      role: RoleType.waiter,
      phoneNumber: "5566778899",
      contract: "Part-time",
    },
  ];

  for (const user of users) {
    await prisma.users.create({
      data: user,
    });
  }

  console.log("Seeding completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
