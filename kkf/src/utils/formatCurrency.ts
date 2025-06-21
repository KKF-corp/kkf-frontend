export function formatCurrency(value: number): string {
  // Formatowanie liczby na polski format walutowy PLN z dwoma miejscami po przecinku
  return `${value.toLocaleString("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} PLN`;
}
