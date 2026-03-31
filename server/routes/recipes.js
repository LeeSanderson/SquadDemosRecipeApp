const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Recipe = require('../models/Recipe');

const router = express.Router();

// GET /api/recipes — return all recipes
router.get('/', (req, res) => {
  try {
    const recipes = Recipe.getAll();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
});

// GET /api/recipes/:id — return single recipe
router.get('/:id', (req, res) => {
  try {
    const recipe = Recipe.getById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
});

// POST /api/recipes — create recipe
router.post('/', (req, res) => {
  try {
    const { title, ingredients, instructions, description, author } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: 'title, ingredients, and instructions are required' });
    }

    const newRecipe = {
      id: uuidv4(),
      title,
      description: description || '',
      ingredients,
      instructions,
      author: author || 'Anonymous',
      createdAt: new Date().toISOString(),
    };

    const created = Recipe.create(newRecipe);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT /api/recipes/:id — update recipe
router.put('/:id', (req, res) => {
  try {
    const updated = Recipe.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Recipe not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE /api/recipes/:id — delete recipe
router.delete('/:id', (req, res) => {
  try {
    const deleted = Recipe.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
