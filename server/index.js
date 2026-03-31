const express = require('express');
const cors = require('cors');
const recipeRoutes = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/api/recipes', recipeRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Recipe API server running on port ${PORT}`);
  });
}

module.exports = app;
