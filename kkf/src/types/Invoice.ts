export interface Invoice {
  id: number;
  number: string;
  issueDate: string;
  saleDate: string;
  contractorId: number;
  totalNetPrice: number;
  totalGrossPrice: number;
  status: "draft" | "issued" | "paid" | "cancelled";
  kind: string; // np. "VAT", "proforma", itd.
  deleted?: boolean;
}
