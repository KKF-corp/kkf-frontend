export interface Contractor {
  id: number;
  name: string;
  nip: string;
  address: string;
  type: "company" | "individual";
  deleted?: boolean;
}
