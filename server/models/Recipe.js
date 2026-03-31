const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/recipes.json');

function readRecipes() {
  const raw = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

function writeRecipes(recipes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2), 'utf-8');
}

const Recipe = {
  getAll() {
    return readRecipes();
  },

  getById(id) {
    const recipes = readRecipes();
    return recipes.find((r) => r.id === id) || null;
  },

  create(data) {
    const recipes = readRecipes();
    recipes.push(data);
    writeRecipes(recipes);
    return data;
  },

  update(id, data) {
    const recipes = readRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return null;
    recipes[index] = { ...recipes[index], ...data, id };
    writeRecipes(recipes);
    return recipes[index];
  },

  delete(id) {
    const recipes = readRecipes();
    const index = recipes.findIndex((r) => r.id === id);
    if (index === -1) return false;
    recipes.splice(index, 1);
    writeRecipes(recipes);
    return true;
  },
};

module.exports = Recipe;
