import { Service } from "../types/Service";

export const servicesMock: Service[] = [
  {
    id: 1,
    name: "Usługa konsultingowa",
    description: "Doradztwo IT",
    categoryId: 2,
    netPrice: 2000,
    grossPrice: 2460,
    deleted: false,
  },
  {
    id: 2,
    name: "Projektowanie graficzne",
    description: "Logo i identyfikacja wizualna",
    categoryId: 5,
    netPrice: 1500,
    grossPrice: 1845,
  },
];
