import { Expense } from "../types/Expense";

export const expensesMock: Expense[] = [
  {
    id: 1,
    name: "Zakup materiałów",
    description: "Materiały biurowe",
    purchaseDate: "2024-05-02",
    totalNetPrice: 300,
    totalGrossPrice: 369,
    categoryId: 3,
    transactionType: "expense",
    invoiceId: 3,
    contractorId: 3,
    deleted: false,
  },
  {
    id: 2,
    name: "Opłata za hosting",
    purchaseDate: "2024-05-05",
    totalNetPrice: 100,
    totalGrossPrice: 123,
    categoryId: 4,
    transactionType: "expense",
    invoiceId: 4,
    contractorId: 4,
  },
];
