export interface Revenue {
  id: number;
  name: string;
  description?: string;
  deleted?: boolean;
  saleDate: string;
  totalNetPrice: number;
  totalGrossPrice: number;
  categoryId: number;
  transactionType: "revenue" | "expense";
  invoiceId?: number;
  contractorId?: number;
}
