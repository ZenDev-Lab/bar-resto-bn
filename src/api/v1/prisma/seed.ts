import { users } from "./Users";
import { Products } from "./Products";
import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient()

const main = async () => {
    for(let user of users) {
        await prisma.users.create({
            data: user
        })
    }


    // for(let product of Products) {
    //     await prisma.products.create({
    //         data: product
    //     })
    // }
}

main().catch((e) => {
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})