import { Revenue } from "../types/Revenue";

export const revenuesMock: Revenue[] = [
  {
    id: 1,
    name: "Sprzedaż produktu A",
    description: "Sprzedaż hurtowa produktu A",
    saleDate: "2024-05-01",
    totalNetPrice: 1000,
    totalGrossPrice: 1230,
    categoryId: 1,
    transactionType: "revenue",
    invoiceId: 1,
    contractorId: 1,
    deleted: false,
  },
  {
    id: 2,
    name: "Usługa konsultingowa",
    saleDate: "2024-05-03",
    totalNetPrice: 2000,
    totalGrossPrice: 2460,
    categoryId: 2,
    transactionType: "revenue",
    invoiceId: 2,
    contractorId: 2,
  },
];
