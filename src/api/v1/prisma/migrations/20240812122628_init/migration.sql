-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Cashier', 'Kitchen', 'Finance', 'Beverage');

-- CreateTable
CREATE TABLE "Users" (
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "email" STRING NOT NULL,
    "age" INT4 NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Cashier',

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
