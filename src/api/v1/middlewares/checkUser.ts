import prisma from "../utils/connectDb";

export const verifyStocker = async (data: any) => {
  if (data.role !== "stocker") {
    return {
      allowed: false,
      message: "Only stock keeper is allowed to create product",
    };
  }

  return { allowed: true };
};

export const verifyWaiter = async (data: any) => {
  if (data.role !== "waiter") {
    return {
      allowed: false,
      message: "Only waiter is allowed to create order",
    };
  }

  return { allowed: true };
};

export const verifyCashier = async (userId: any) => {
  const user: any = await prisma.users.findUnique({
    where: {
      userId,
    },
  });
  if (!user) {
    return {
      allowed: false,
      message: "User not found",
    };
  } else if (user.role !== "cashier") {
    return {
      allowed: false,
      message: `You have chosen ${user.role} and you are supposed to choose cashier`,
    };
  }

  return { allowed: true };
};

export const verifyGetOrder = async (userId: string) => {
    console.log('-->inside get order')
  const user: any = await prisma.users.findUnique({
    where: {
      userId,
    },
  });
  if (!user) {
    return {
      allowed: false,
      message: "User not found",
    };
  } 
  else if (user.role === "cashier" || user.role === "waiter") {
    return {
      allowed: true,
      user
    };
  }

  return {
    allowed: false,
    message: `${user.role} is not allowed to view this order. Only cashier and waiter is allowed to view this order`,
  };
};
