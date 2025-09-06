import { Link, Route, Routes } from "react-router-dom";
import { DataProvider } from "../state/DataContext";
import ItemDetail from "./ItemDetail";
import Items from "./Items";
import Stats from "./Stats";
function App() {
  return (
    <DataProvider>
      <nav
        style={{
          padding: 16,
          borderBottom: "1px solid #ddd",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/">Items</Link>
        <Link to="/stats">Stats</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="/stats" element={<Stats />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
