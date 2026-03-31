# RecipeShare

A full-stack recipe sharing application where users can browse, create, and share recipes.

## Tech Stack

| Layer    | Technology           |
|----------|----------------------|
| Client   | React 18 + Vite      |
| Server   | Node.js + Express    |
| Storage  | JSON file (MVP)      |
| Routing  | React Router         |
| HTTP     | Axios                |

## Project Structure

```
├── client/          React single-page app (Vite)
│   ├── src/
│   │   ├── components/   Reusable UI components
│   │   ├── pages/        Route-level page components
│   │   ├── App.jsx       Router + layout
│   │   └── main.jsx      Entry point
│   └── index.html
├── server/          Express REST API
│   ├── routes/      Route handlers
│   ├── models/      Data access layer
│   ├── data/        JSON file store
│   └── index.js     Server entry point
└── package.json     Root scripts (concurrently)
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Install Dependencies

```bash
# Install root + client + server dependencies in one go
npm run install:all
```

Or install each individually:

```bash
npm install            # root (concurrently)
cd client && npm install
cd ../server && npm install
```

### Run Development Servers

```bash
# Start both client and server concurrently
npm run dev
```

Or run them separately:

```bash
npm run client    # React dev server → http://localhost:5173
npm run server    # Express API      → http://localhost:5000
```

### API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| GET    | `/api/health`       | Health check         |
| GET    | `/api/recipes`      | List all recipes     |
| GET    | `/api/recipes/:id`  | Get recipe by ID     |
| POST   | `/api/recipes`      | Create a new recipe  |
| PUT    | `/api/recipes/:id`  | Update a recipe      |
| DELETE | `/api/recipes/:id`  | Delete a recipe      |

### Sample API Test

```bash
curl http://localhost:5000/api/health
# → { "status": "ok", "timestamp": "..." }
```

## License

MIT
