# Hockney — History

## Project Context
- **Project:** Recipe sharing app — React (frontend) + Node.js (backend)
- **User:** LeeSanderson
- **Repo:** LeeSanderson/SquadDemosRecipeApp
- **Stack:** React, Node.js
- **Goal:** Users can share, browse, and discover recipes

## Learnings

- Server is Node.js/Express at `server/`. Data stored in `server/data/recipes.json` (3 seed recipes with ids "1", "2", "3").
- `server/package.json` was pre-created by Verbal with express, cors, uuid, and nodemon.
- Added `jest ^29` and `supertest ^6` to devDependencies; added `"test"` and `"test:watch"` scripts; added `"jest": { "testEnvironment": "node" }`.
- Created `server/__tests__/recipes.test.js` — full integration suite via supertest (8 scenarios covering all CRUD endpoints + health).
- Created `server/__tests__/recipe-model.test.js` — unit suite for `Recipe` model (getAll, getById, create, update, delete).
- Both suites snapshot and restore `recipes.json` in beforeAll/afterAll to leave seed data clean.
- `recipe-model.test.js` also calls `jest.resetModules()` + re-requires the model in `afterEach` to prevent mutation bleed between tests.
- **Dependency on Verbal**: tests require `index.js` to export `app` (not just call `listen`) and `models/Recipe.js` to exist with the standard CRUD interface.
