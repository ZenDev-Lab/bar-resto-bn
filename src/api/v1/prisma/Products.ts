import { PrismaClient, CategoryType } from "@prisma/client";

export const Products = [
    {
        name: 'Product A',
        expirationDate: '2025-12-31',
        entiryDate: new Date(),
        category: CategoryType.food,
        price: '100.00',
        supplier: 'Supplier A',
        quantity: '50',
        stockerId: '21ee85cc-dc96-4d81-ad56-6530f54a9ffc',
      },
      {
        name: 'Product B',
        expirationDate: '2024-11-30',
        entiryDate: new Date(),
        category: CategoryType.beverage,
        price: '200.00',
        supplier: 'Supplier B',
        quantity: '30',
        stockerId: '21ee85cc-dc96-4d81-ad56-6530f54a9ffc',
      },
      {
        name: 'Product C',
        expirationDate: '2026-06-15',
        entiryDate: new Date(),
        category: CategoryType.cleaning,
        price: '50.00',
        supplier: 'Supplier C',
        quantity: '100',
        stockerId: '21ee85cc-dc96-4d81-ad56-6530f54a9ffc',
      },
      {
        name: 'Product D',
        expirationDate: '2025-01-20',
        entiryDate: new Date(),
        category: CategoryType.utensil,
        price: '15.00',
        supplier: 'Supplier D',
        quantity: '200',
        stockerId: '21ee85cc-dc96-4d81-ad56-6530f54a9ffc',
      },
]