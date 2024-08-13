-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('admin', 'cashier', 'kitchen', 'finance', 'beverage', 'stocker', 'waiter');

-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('pending', 'processing', 'ready', 'delivered', 'paid');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('drink', 'food');

-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('food', 'beverage', 'cleaning', 'utensil');

-- CreateTable
CREATE TABLE "Users" (
    "userId" STRING NOT NULL,
    "profile" STRING,
    "firstName" STRING NOT NULL,
    "lastName" STRING NOT NULL,
    "email" STRING NOT NULL,
    "password" STRING NOT NULL,
    "age" INT4,
    "role" "RoleType" NOT NULL DEFAULT 'waiter',
    "phoneNumber" STRING NOT NULL,
    "contract" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" STRING NOT NULL,
    "type" "OrderType",
    "waiterId" STRING NOT NULL,
    "status" "StatusType" NOT NULL DEFAULT 'pending',
    "table" STRING,
    "cashierId" STRING NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Menu" (
    "itemId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "price" STRING NOT NULL,
    "quantity" STRING,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "expirationDate" STRING,
    "entiryDate" TIMESTAMP(3) NOT NULL,
    "category" "CategoryType" NOT NULL,
    "price" STRING NOT NULL,
    "supplier" STRING NOT NULL,
    "quantity" STRING NOT NULL,
    "stockerId" STRING NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_waiterId_fkey" FOREIGN KEY ("waiterId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_stockerId_fkey" FOREIGN KEY ("stockerId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
