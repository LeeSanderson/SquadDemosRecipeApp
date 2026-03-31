# McManus — History

## Project Context
- **Project:** Recipe sharing app — React (frontend) + Node.js (backend)
- **User:** LeeSanderson
- **Repo:** LeeSanderson/SquadDemosRecipeApp
- **Stack:** React, Node.js
- **Goal:** Users can share, browse, and discover recipes

## Learnings

- Built complete React frontend for RecipeShare app (2025)
- Used React Router v6 with `/`, `/recipes`, `/recipes/:id`, `/recipes/new`
- Route order matters: `/recipes/new` must be declared before `/recipes/:id` to avoid "new" being treated as an ID param
- RecipeCard uses `recipe._id || recipe.id` to support both MongoDB `_id` and plain `id` from the backend
- Ingredients stored as array in DB but displayed from either array or newline-separated string for flexibility
- Vite proxy configured for `/api` → `http://localhost:5000` to avoid CORS issues in dev
- CSS uses CSS Grid with `auto-fill / minmax(280px, 1fr)` for responsive recipe grid without media queries
- Error and loading states handled in all data-fetching pages

## Post-Spawn (2026-03-31)
- Frontend architecture decision merged from inbox to decisions.md
- Orchestration log recorded at `.squad/orchestration-log/2026-03-31T21-15-00Z-mcmanus-frontend.md`
- Session log created documenting full build
