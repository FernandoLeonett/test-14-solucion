import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ITEMS_URL } from "../api/api.js";

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${ITEMS_URL}/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then(setItem)
      .catch(() => setError("Item no encontrado"));
  }, [id]);

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <p>{error}</p>
        <button onClick={() => navigate("/")}>Volver a lista</button>
      </div>
    );
  }

  if (!item) return <p>Loading...</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{item.name}</h2>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Price:</strong> ${item.price}
      </p>
    </div>
  );
}

export default ItemDetail;
