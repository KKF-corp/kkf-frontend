export interface Transaction {
  id: number;
  name: string;
  description?: string;
  date: string;
  type: "revenue" | "expense";
  categoryId: number;
  invoiceId?: number;
  contractorId?: number;
  deleted?: boolean;
}
