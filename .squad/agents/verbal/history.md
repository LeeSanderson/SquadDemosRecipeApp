# Verbal — History

## Project Context
- **Project:** Recipe sharing app — React (frontend) + Node.js (backend)
- **User:** LeeSanderson
- **Repo:** LeeSanderson/SquadDemosRecipeApp
- **Stack:** React, Node.js
- **Goal:** Users can share, browse, and discover recipes

## Learnings

- Built full Express REST API for recipe sharing app (2024-01-17)
- Data store: JSON file (`server/data/recipes.json`) — simple, no DB setup required for demo
- Recipe model uses fs.readFileSync/writeFileSync for all CRUD operations
- API runs on port 5000 (or process.env.PORT), CORS open for dev
- Endpoints: GET/POST /api/recipes, GET/PUT/DELETE /api/recipes/:id, GET /api/health
- New recipes get uuid v4 IDs; seed data uses string IDs "1", "2", "3"
- All route handlers wrapped in try/catch for consistent error responses
