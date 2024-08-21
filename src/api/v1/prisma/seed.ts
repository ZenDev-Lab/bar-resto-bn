import { PrismaClient } from "@prisma/client";
import { createUsers } from "./Users";
import { MenuItems } from "./menu";

const prisma = new PrismaClient();

const main = async () => {
    // Seed users
    const users = await createUsers();
    for (let user of users) {
        await prisma.users.create({
            data: user,
        });
    }


    for (let item of MenuItems) {
        await prisma.menu.create({
            data: item,
        });
    }
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect();
    });
