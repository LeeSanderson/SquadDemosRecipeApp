/**
 * Integration tests for the Recipe API.
 *
 * NOTE: Requires index.js to export `app` (not just call app.listen).
 * Example: module.exports = app;  -- or use a separate server.js to call listen.
 *
 * Run: npm test  (from the server/ directory)
 */

const request = require('supertest');
const fs = require('fs');
const path = require('path');

const RECIPES_PATH = path.join(__dirname, '..', 'data', 'recipes.json');

let app;
let originalRecipes;

beforeAll(() => {
  // Snapshot the data file so we can restore it after mutating tests
  originalRecipes = fs.readFileSync(RECIPES_PATH, 'utf8');

  // Require app after snapshotting so any module-level data load gets fresh state
  app = require('../index');
});

afterAll(() => {
  // Restore recipes.json to its original state
  fs.writeFileSync(RECIPES_PATH, originalRecipes, 'utf8');
});

describe('Recipe API', () => {
  // ── Health ────────────────────────────────────────────────────────────────
  describe('GET /api/health', () => {
    it('returns 200 with status ok', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  // ── List recipes ──────────────────────────────────────────────────────────
  describe('GET /api/recipes', () => {
    it('returns 200 with an array of recipes', async () => {
      const res = await request(app).get('/api/recipes');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // ── Get single recipe ─────────────────────────────────────────────────────
  describe('GET /api/recipes/:id', () => {
    it('returns 200 with the recipe for a valid id', async () => {
      const res = await request(app).get('/api/recipes/1');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', '1');
      expect(res.body).toHaveProperty('title');
    });

    it('returns 404 for an unknown id', async () => {
      const res = await request(app).get('/api/recipes/nonexistent-id-99999');
      expect(res.status).toBe(404);
    });
  });

  // ── Create recipe ─────────────────────────────────────────────────────────
  describe('POST /api/recipes', () => {
    it('returns 201 with the new recipe including an id', async () => {
      const payload = {
        title: 'Test Recipe',
        description: 'A test recipe created by integration tests',
        ingredients: ['ingredient 1', 'ingredient 2'],
        instructions: 'Mix things together.',
        author: 'Hockney'
      };

      const res = await request(app).post('/api/recipes').send(payload);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe(payload.title);
    });

    it('returns 400 when title is missing', async () => {
      const payload = {
        description: 'No title provided',
        ingredients: [],
        instructions: 'Do nothing.',
        author: 'Hockney'
      };

      const res = await request(app).post('/api/recipes').send(payload);
      expect(res.status).toBe(400);
    });
  });

  // ── Update recipe ─────────────────────────────────────────────────────────
  describe('PUT /api/recipes/:id', () => {
    it('returns 200 with the updated recipe', async () => {
      const update = { title: 'Updated Carbonara' };

      const res = await request(app).put('/api/recipes/1').send(update);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('id', '1');
      expect(res.body.title).toBe('Updated Carbonara');
    });
  });

  // ── Delete recipe ─────────────────────────────────────────────────────────
  describe('DELETE /api/recipes/:id', () => {
    it('returns 200 with a deletion confirmation message', async () => {
      // Create a throwaway recipe first so seed data stays intact
      const created = await request(app)
        .post('/api/recipes')
        .send({
          title: 'Recipe to Delete',
          description: 'Will be removed.',
          ingredients: [],
          instructions: 'N/A',
          author: 'Hockney'
        });

      const { id } = created.body;

      const res = await request(app).delete(`/api/recipes/${id}`);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ message: 'Recipe deleted' });
    });
  });
});
