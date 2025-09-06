import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../state/DataContext";

function Items() {
  const { items, fetchItems } = useData();

  useEffect(() => {
    const loadItems = async () => {
      try {
        await fetchItems(); // ya sin signal
      } catch (err) {
        console.error(err);
      }
    };

    loadItems();
  }, [fetchItems]);

  if (!items || items.length === 0) return <p>Loading...</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={`/items/${item.id}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;
