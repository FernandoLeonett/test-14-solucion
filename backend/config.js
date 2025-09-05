import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const DATA_PATH =
  process.env.NODE_ENV === "test"
    ? path.join(__dirname, "./mock-data/items.json")
    : path.join(__dirname, "./data/items.json");

export const PORT = process.env.PORT || 3001;
