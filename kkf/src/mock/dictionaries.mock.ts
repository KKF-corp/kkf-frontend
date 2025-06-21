import { Dictionary } from "../types/Dictionary";

export const dictionariesMock: Dictionary[] = [
  { id: 1, name: "Przychód", type: "transactionType" },
  { id: 2, name: "Wydatek", type: "transactionType" },
  { id: 3, name: "VAT", type: "invoiceKind" },
  { id: 4, name: "Proforma", type: "invoiceKind" },
  { id: 5, name: "Wystawiona", type: "invoiceState" },
  { id: 6, name: "Opłacona", type: "invoiceState" },
  { id: 7, name: "Firma", type: "contractorType" },
  { id: 8, name: "Osoba fizyczna", type: "contractorType" },
  { id: 9, name: "Usługa IT", type: "serviceType" },
  { id: 10, name: "Grafika", type: "serviceType" },
];
