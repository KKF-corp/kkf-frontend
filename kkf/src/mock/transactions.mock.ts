import { Transaction } from "../types/Transaction";

export const transactionsMock: Transaction[] = [
  {
    id: 1,
    name: "Wpływ od klienta",
    date: "2024-05-01",
    type: "revenue",
    categoryId: 1,
    invoiceId: 1,
    contractorId: 1,
    deleted: false,
  },
  {
    id: 2,
    name: "Opłata za domenę",
    date: "2024-05-04",
    type: "expense",
    categoryId: 4,
    invoiceId: 4,
    contractorId: 4,
  },
];
