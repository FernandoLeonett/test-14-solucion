import { useEffect, useState } from "react";
import { useData } from "../state/DataContext";

function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchStats } = useData();

  useEffect(() => {
    fetchStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [fetchStats]);

  if (loading) return <p>Loading stats...</p>;
  if (!stats) return <p>No stats available</p>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Statistics</h2>
      <p>Total items: {stats.total}</p>
      <p>Average price: {stats.averagePrice}</p>
    </div>
  );
}

export default Stats;
