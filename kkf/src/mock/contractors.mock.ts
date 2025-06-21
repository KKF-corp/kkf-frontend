import { Contractor } from "../types/Contractor";

export const contractorsMock: Contractor[] = [
  {
    id: 1,
    name: "Firma ABC Sp. z o.o.",
    nip: "1234567890",
    address: "ul. Przykładowa 1, 00-001 Warszawa",
    type: "company",
    deleted: false,
  },
  {
    id: 2,
    name: "Jan Kowalski",
    nip: "9876543210",
    address: "ul. Testowa 2, 00-002 Kraków",
    type: "individual",
  },
];
