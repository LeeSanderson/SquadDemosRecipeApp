# Squad Decisions

## Architecture Decision: Monorepo Structure

**Author:** Keaton (Lead)  
**Date:** 2025-07-14  
**Status:** Accepted

### Context
Setting up the initial project structure for RecipeShare — a full-stack recipe sharing application.

### Decisions

1. **Monorepo with `client/` + `server/`**: Single repository with two top-level directories. Root `package.json` uses `concurrently` to run both dev servers with one command (`npm run dev`).
   - **Rationale:** Simple to navigate, easy to share types/constants later, single git history.

2. **Vite for React Client**: Using Vite (not Create React App) with the `react` template.
   - **Rationale:** Faster, lighter, actively maintained. Vite's dev proxy (`/api → localhost:5000`) eliminates CORS issues.

3. **Express + JSON File Store (No Database for MVP)**: Server uses Express with JSON file (`server/data/recipes.json`) as data store via a `Recipe` model.
   - **Rationale:** Zero setup cost. The `Recipe` model abstracts storage for easy DB swap later.

4. **REST API Design**: Standard RESTful routes under `/api/recipes` with full CRUD.
   - **Rationale:** Conventional, easy to test, works well with axios on the client.

### Consequences
- Adding a database later requires only changing `server/models/Recipe.js`
- No auth yet — all recipes public and editable by anyone
- JSON file store doesn't handle concurrent writes safely (acceptable for MVP)

---

## Frontend Architecture Decisions

**Author:** McManus  
**Date:** 2025  
**Status:** Active

### Decisions

1. **React Router v6 with Vite**: Route for `/recipes/new` placed **before** `/recipes/:id` to prevent "new" being matched as dynamic segment.

2. **Axios over fetch**: Simpler error handling, automatic JSON parsing, consistent response shape.

3. **Client-side search filtering**: Recipe list filters already-fetched array in memory rather than calling API on each keystroke.

4. **Ingredient normalization in UI**: `RecipeDetailPage` handles ingredients as either array (from API) or newline-delimited string, normalizing at render time.

5. **CSS approach**: Kept styles in single `index.css` with BEM-ish class names — zero-config, easy to read.

---

## Backend Architecture Decision

**Date:** 2024-01-17  
**Author:** Verbal (Backend Dev)  
**Status:** Implemented

### Data Store: JSON File
Chose flat JSON file (`server/data/recipes.json`) as data store rather than a database.

**Rationale:**
- Zero setup — no DB install, no migrations, no connection strings
- Sufficient for demo/prototype with small dataset
- Easy to inspect and seed with sample data
- Trade-off: not suitable for production scale or concurrent writes

### API Contract
- **Base URL:** `http://localhost:5000/api`
- **Endpoints:** GET /health, GET/POST /api/recipes, GET/PUT/DELETE /api/recipes/:id
- **Recipe shape:** `{ id, title, description, ingredients[], instructions, author, createdAt }`
- **Error shape:** `{ error: "message" }`
- **Server Port:** 5000 (or process.env.PORT)
- **CORS:** Open for development

---

## Test Strategy — Recipe Sharing App Backend

**Author:** Hockney  
**Date:** 2025  
**Status:** Active

### Overview
Integration and unit tests for Node.js/Express recipe API. Run with `npm test` from `server/` directory using **Jest 29** and **Supertest 6**.

### Test Coverage
- **Integration tests** (`recipes.test.js`): 8 scenarios covering all HTTP endpoints via supertest
- **Unit tests** (`recipe-model.test.js`): 9 scenarios testing `models/Recipe.js` CRUD methods

### Key Requirements
1. **`server/index.js` must export `app`** (not only call `app.listen`)
   ```js
   module.exports = app;        // export for tests
   if (require.main === module) app.listen(PORT);  // only listen when run directly
   ```

2. **`server/models/Recipe.js`** must export: `getAll()`, `getById(id)`, `create(data)`, `update(id, data)`, `delete(id)`

### Data Safety
- Both suites snapshot and restore `recipes.json` in beforeAll/afterAll
- Recipe-model tests call `jest.resetModules()` in afterEach to prevent mutation bleed
- DELETE test creates throwaway recipe so seed data never permanently removed

---

## Governance

- All meaningful changes require team consensus
- Document architectural decisions here
- Keep history focused on work, decisions focused on direction
