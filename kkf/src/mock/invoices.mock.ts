import { Invoice } from "../types/Invoice";

export const invoicesMock: Invoice[] = [
  {
    id: 1,
    number: "FV/2024/05/001",
    issueDate: "2024-05-01",
    saleDate: "2024-05-01",
    contractorId: 1,
    totalNetPrice: 1000,
    totalGrossPrice: 1230,
    status: "issued",
    kind: "VAT",
    deleted: false,
  },
  {
    id: 2,
    number: "FV/2024/05/002",
    issueDate: "2024-05-03",
    saleDate: "2024-05-03",
    contractorId: 2,
    totalNetPrice: 2000,
    totalGrossPrice: 2460,
    status: "paid",
    kind: "VAT",
  },
];
