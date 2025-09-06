import { createContext, useCallback, useContext, useState } from "react";
import { ITEMS_URL, STATS_URL } from "../api/api.js";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState(null);

  const fetchItems = useCallback(async ({ q = "", limit } = {}) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (limit) params.set("limit", String(limit));

    const res = await fetch(`${ITEMS_URL}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch items");
    const data = await res.json();
    setItems(data);
    return data;
  }, []);

  const fetchStats = useCallback(async () => {
    const res = await fetch(`${STATS_URL}`);
    const data = await res.json();
    setStats(data);
    return data;
  }, []);

  return <DataContext.Provider value={{ items, stats, fetchItems, fetchStats }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
