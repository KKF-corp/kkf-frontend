export interface Expense {
  id: number;
  name: string;
  description?: string;
  purchaseDate: string;
  totalNetPrice: number;
  totalGrossPrice: number;
  categoryId: number;
  transactionType: "expense";
  invoiceId?: number;
  contractorId?: number;
  deleted?: boolean;
}
