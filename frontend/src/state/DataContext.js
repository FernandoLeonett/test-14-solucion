import { createContext, useCallback, useContext, useState } from "react";
import { ITEMS_URL } from "../api/api.js";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);

  const fetchItems = useCallback(async () => {
    const res = await fetch(`${ITEMS_URL}?limit=500`);
    const json = await res.json();
    setItems(json);
  }, []);

  return <DataContext.Provider value={{ items, fetchItems }}>{children}</DataContext.Provider>;
}

export const useData = () => useContext(DataContext);
