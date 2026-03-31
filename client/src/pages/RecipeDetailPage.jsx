import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data } = await axios.get(`/api/recipes/${id}`);
        setRecipe(data);
      } catch (err) {
        setError('Recipe not found or failed to load.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <p className="loading">Loading recipe…</p>;
  if (error) return <p className="error-message">{error}</p>;

  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : (recipe.ingredients || '').split('\n').filter(Boolean);

  return (
    <div className="recipe-detail">
      <Link to="/recipes" className="back-link">← Back to Recipes</Link>

      <h1>{recipe.title}</h1>
      <p className="meta">By {recipe.author}</p>

      {recipe.description && (
        <p className="description">{recipe.description}</p>
      )}

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, i) => (
          <li key={i}>{item.trim()}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      <p className="instructions">{recipe.instructions}</p>
    </div>
  );
}
