export interface Service {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  netPrice: number;
  grossPrice: number;
  deleted?: boolean;
}
