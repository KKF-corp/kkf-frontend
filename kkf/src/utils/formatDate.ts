export function formatDate(dateStr: string): string {
  // Formatowanie daty w formacie ISO (YYYY-MM-DD) na format polski DD.MM.YYYY
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}.${parts[1]}.${parts[0]}`;
  }
  return dateStr; // zwróć oryginał, jeśli format nie pasuje
}
