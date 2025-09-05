import { PORT } from "./config.js";
import app from "./index.js";

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
