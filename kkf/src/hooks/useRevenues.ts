import { useState } from "react";
import { revenuesMock } from "../mock/revenues.mock";
import { Revenue } from "../types/Revenue";

export function useRevenues() {
  const [revenues, setRevenues] = useState<Revenue[]>(revenuesMock);

  const addRevenue = (rev: Revenue) => setRevenues(prev => [...prev, { ...rev, id: Date.now() }]);
  const updateRevenue = (rev: Revenue) => setRevenues(prev => prev.map(r => r.id === rev.id ? rev : r));
  const deleteRevenue = (id: number) => setRevenues(prev => prev.filter(r => r.id !== id));

  return { revenues, addRevenue, updateRevenue, deleteRevenue };
}
