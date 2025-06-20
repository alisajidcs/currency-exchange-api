# Currency Exchange Fullstack App

A modern fullstack currency exchange application with a Node.js/Express backend and a Next.js (React) frontend using shadcn/ui for beautiful UI components.

---

## Features
- Get latest currency exchange rates
- Convert between currencies
- View historical rates with pagination
- Modern, accessible UI with [shadcn/ui](https://ui.shadcn.com/)

---

## Project Structure

```
.
├── backend/      # Node.js/Express API
└── frontend/     # Next.js (React) UI
```

---

## Backend Setup (Express API)

1. **Install dependencies:**
   ```sh
   cd backend
   npm install
   ```
2. **Start the backend server:**
   ```sh
   npm run dev
   # or
   npm start
   ```
   By default, the backend runs on **http://localhost:3001**

3. **CORS:**
   - The backend is configured to allow requests from the frontend (`http://localhost:3000`).
   - If you change the frontend port, update the CORS config in `backend/src/app.ts`.

---

## Frontend Setup (Next.js + shadcn/ui)

1. **Install dependencies:**
   ```sh
   cd frontend
   npm install
   ```
2. **shadcn/ui setup:**
   - Already initialized and components added (Button, Card, Input, Select, Label).
   - You can add more components as needed with `npx shadcn-ui@latest add <component>`.

3. **Start the frontend app:**
   ```sh
   npm run dev
   ```
   By default, the frontend runs on **http://localhost:3000**

4. **API Base URL:**
   - The frontend is configured to call the backend at `http://localhost:3001/api`.
   - If you change backend port, update `frontend/src/api.ts`.

---

## Usage
- Visit [http://localhost:3000](http://localhost:3000) in your browser.
- Use the dashboard to:
  - View latest rates for any currency
  - Convert between currencies
  - Browse historical rates

---

## Development Notes
- **TypeScript** is used throughout for type safety.
- **shadcn/ui** provides modern, accessible UI components.
- **CORS** is enabled in the backend for local development.
- **API endpoints:**
  - `GET /api/latest/:base`
  - `POST /api/convert`
  - `GET /api/history`

---

## Customization
- Add more shadcn/ui components for richer UI.
- Adjust CORS or API base URLs as needed for deployment.
- Extend backend or frontend features as desired!

---

## License
MIT 