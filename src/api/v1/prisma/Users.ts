import { RoleType } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';

const hashedPwd = async (pass: string) => {
  return bcrypt.hash(pass, 10);
};

export const createUsers = async () => {
  const users = [
    {
      userId: uuidv4(),
      username: "johndoe",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      password: await hashedPwd('pass'),
      age: 25,
      role: RoleType.waiter,
      phoneNumber: "1234567890",
      contract: "Contract A",
    },
    {
      userId: uuidv4(),
      username: "janedoe",
      firstName: "Jane",
      lastName: "Doe",
      email: "janedoe@example.com",
      password: await hashedPwd('pass'),
      age: 30,
      role: RoleType.cashier,
      phoneNumber: "0987654321",
      contract: "Contract B",
    },
    {
      userId: uuidv4(),
      username: "alice",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      password: await hashedPwd('pass'),
      age: 28,
      role: RoleType.chief,
      phoneNumber: "1122334455",
      contract: "Contract C",
    },
    {
      userId: uuidv4(),
      username: "bob",
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob@example.com",
      password: await hashedPwd('pass'),
      age: 35,
      role: RoleType.finance,
      phoneNumber: "5566778899",
      contract: "Contract D",
    },
    {
      userId: uuidv4(),
      username: "carol",
      firstName: "Carol",
      lastName: "Williams",
      email: "carol@example.com",
      password: await hashedPwd('pass'),
      age: 40,
      role: RoleType.stocker,
      phoneNumber: "6677889900",
      contract: "Contract E",
    },
  ];

  return users;
};
