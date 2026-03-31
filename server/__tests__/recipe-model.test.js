/**
 * Unit tests for the Recipe model (server/models/Recipe.js).
 *
 * The model is tested in isolation — no HTTP layer involved.
 * We snapshot and restore recipes.json around the full suite so the data
 * file is left unchanged after the tests run.
 *
 * Run: npm test  (from the server/ directory)
 */

const fs = require('fs');
const path = require('path');

const RECIPES_PATH = path.join(__dirname, '..', 'data', 'recipes.json');

let Recipe;
let originalRecipes;

beforeAll(() => {
  originalRecipes = fs.readFileSync(RECIPES_PATH, 'utf8');
  Recipe = require('../models/Recipe');
});

afterAll(() => {
  fs.writeFileSync(RECIPES_PATH, originalRecipes, 'utf8');
});

// Reset module cache + restore data between each test so mutations don't bleed over
afterEach(() => {
  fs.writeFileSync(RECIPES_PATH, originalRecipes, 'utf8');
  jest.resetModules();
  Recipe = require('../models/Recipe');
});

describe('Recipe model', () => {
  // ── getAll ────────────────────────────────────────────────────────────────
  describe('getAll()', () => {
    it('returns an array', () => {
      const recipes = Recipe.getAll();
      expect(Array.isArray(recipes)).toBe(true);
    });

    it('returns the seeded recipes', () => {
      const recipes = Recipe.getAll();
      expect(recipes.length).toBeGreaterThan(0);
    });
  });

  // ── getById ───────────────────────────────────────────────────────────────
  describe('getById()', () => {
    it('returns the recipe when the id exists', () => {
      const recipe = Recipe.getById('1');
      expect(recipe).not.toBeNull();
      expect(recipe).toHaveProperty('id', '1');
    });

    it('returns null when the id does not exist', () => {
      const recipe = Recipe.getById('nonexistent-99999');
      expect(recipe).toBeNull();
    });
  });

  // ── create ────────────────────────────────────────────────────────────────
  describe('create()', () => {
    it('returns the new recipe with an auto-generated id and createdAt timestamp', () => {
      const data = {
        title: 'New Test Recipe',
        description: 'Created by unit test',
        ingredients: ['flour', 'water'],
        instructions: 'Combine and bake.',
        author: 'Hockney'
      };

      const created = Recipe.create(data);

      expect(created).toHaveProperty('id');
      expect(created.id).toBeTruthy();
      expect(created).toHaveProperty('createdAt');
      expect(created.title).toBe(data.title);
    });

    it('persists the new recipe so getAll returns it', () => {
      const data = {
        title: 'Persisted Recipe',
        description: 'Should appear in getAll',
        ingredients: [],
        instructions: 'Nothing.',
        author: 'Hockney'
      };

      const created = Recipe.create(data);
      const all = Recipe.getAll();
      const found = all.find(r => r.id === created.id);

      expect(found).toBeDefined();
    });
  });

  // ── update ────────────────────────────────────────────────────────────────
  describe('update()', () => {
    it('returns the updated recipe with new field values', () => {
      const updated = Recipe.update('1', { title: 'Modified Title' });

      expect(updated).not.toBeNull();
      expect(updated).toHaveProperty('id', '1');
      expect(updated.title).toBe('Modified Title');
    });

    it('preserves existing fields that were not updated', () => {
      const before = Recipe.getById('1');
      const updated = Recipe.update('1', { title: 'New Title Only' });

      expect(updated.description).toBe(before.description);
      expect(updated.author).toBe(before.author);
    });

    it('returns null for a non-existent id', () => {
      const result = Recipe.update('nonexistent-99999', { title: 'Ghost' });
      expect(result).toBeNull();
    });
  });

  // ── delete ────────────────────────────────────────────────────────────────
  describe('delete()', () => {
    it('removes the recipe and returns true', () => {
      const result = Recipe.delete('1');
      expect(result).toBe(true);

      const found = Recipe.getById('1');
      expect(found).toBeNull();
    });

    it('returns false for a non-existent id', () => {
      const result = Recipe.delete('nonexistent-99999');
      expect(result).toBe(false);
    });
  });
});
