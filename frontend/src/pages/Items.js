import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useData } from "../state/DataContext";

function Items() {
  const { items, fetchItems } = useData();

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      try {
        const data = await fetchItems();
        if (!active) return;
      } catch (err) {
        console.error(err);
      }
    };

    loadItems();

    return () => {
      active = false;
    };
  }, [fetchItems]);

  if (!items.length) return <p>Loading...</p>;

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <Link to={"/items/" + item.id}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Items;
