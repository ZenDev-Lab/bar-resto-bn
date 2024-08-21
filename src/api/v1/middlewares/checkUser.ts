import prisma from "../utils/connectDb";

export const verifyStocker = async (tokenData: any) => {
  if (!tokenData.role) {
    return {
      allowed: false,
      message: "Invalid role",
    };
  }

  if (tokenData.role !== "stocker") {
    return {
      allowed: false,
      message: "Only stock keeper is allowed to create product",
    };
  }

  return { allowed: true };
};

export const verifyWaiter = async (tokenData: any) => {
  if (!tokenData.role) {
    return {
      allowed: false,
      message: "Invalid role",
    };
  }
  
  if (tokenData.role !== "waiter") {
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
      message: "Cashier not found",
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
  } else if (user.role === "cashier" || user.role === "waiter" || user.role === "chief" || user.role === "finance" || user.role === "admin") {
    return {
      allowed: true,
      user,
    };
  }

  return {
    allowed: false,
    message: `${user.role} is not allowed to view this order. Only cashier and waiter is allowed to view this order`,
  };
};
