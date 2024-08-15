import prisma from "../utils/connectDb";
type order = "drink" | "food";
type status = "pending" | "processing" | "ready" | "delivered" | "paid";
export const newOrder = async (
  type: order,
  waiterId: string,
  table: string,
  cashierId: string,
  items: any
) => {
    const order = await prisma.orders.create({
        data: {
            type,
            waiterId,
            table,
            cashierId,
            items,
        }
    })
    return order;

};

export const viewOrder = async (orderId: string) => {
    const order = await prisma.orders.findUnique({
        where: {
            orderId
        }
    })
    return order;
}
