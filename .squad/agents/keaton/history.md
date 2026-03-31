# Keaton — History

## Project Context
- **Project:** Recipe sharing app — React (frontend) + Node.js (backend)
- **User:** LeeSanderson
- **Repo:** LeeSanderson/SquadDemosRecipeApp
- **Stack:** React, Node.js
- **Goal:** Users can share, browse, and discover recipes

## Learnings
- Monorepo scaffolded: `client/` (React/Vite) + `server/` (Express) with root `concurrently` scripts
- Vite proxy configured to forward `/api` requests to Express on port 5000
- JSON file store (`server/data/recipes.json`) abstracts behind `Recipe` model — easy to swap for a real DB later
- Full CRUD REST API at `/api/recipes` with validation on POST
- Client has 4 pages (Home, RecipeList, RecipeDetail, CreateRecipe), 2 components (Navbar, RecipeCard), and a complete CSS stylesheet
- Root README.md documents setup, structure, and API endpoints
- Decision recorded in `.squad/decisions/inbox/keaton-architecture.md`
