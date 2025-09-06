# Fullstack Solution Overview

## Overview

Refactored backend and frontend for Node.js 18+ and React, focusing on **security**, **performance**, and **testability**.

---

## Backend Highlights

### Security

- Removed unsafe dynamic code execution (`getCookie`).
- Centralized error handling with `notFound` and `errorHandler`.

### Async & Performance

- Replaced blocking `fs.readFileSync` with `fs/promises`.
- `/api/stats` caches results and recalculates only on file changes.
- Server-side search (`q`) and pagination (`limit`) implemented in `/api/items`.

### Testability

- `app` exported separately from `listen` for **Jest unit tests**.
- `mock-data` directory provides repeatable test scenarios.

---

## Frontend Highlights

### Memory & Performance

- Fixed memory leak in `Items.js` to avoid state updates after unmount.
- Implemented **server-side search** and **pagination**.
- List virtualization (react-window) for smooth rendering with large datasets.

### Stats Component

- Added `Stats.js` to display total items and average price using `/api/stats`.
- Integrated navigation link to view stats.
- Fetching handled via `DataContext` for consistency with items API.

### UX Improvements

- Loading skeletons added for fetch requests.
- Improved styling and accessibility.

---

## Running Backend + Frontend Together

With `concurrently` installed:

```json
"scripts": {
  "dev:all": "concurrently \"npm run dev\" \"cd ../frontend && npm start\""
}
Then run:
npm run dev:all
```
