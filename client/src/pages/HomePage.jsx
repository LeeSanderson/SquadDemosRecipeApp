import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { data } = await axios.get('/api/recipes');
        setFeatured(data.slice(0, 3));
      } catch (err) {
        setError('Could not load featured recipes.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Discover & Share Amazing Recipes</h1>
        <p>
          A community-driven recipe collection. Browse thousands of dishes or
          share your own culinary creations with the world.
        </p>
        <Link to="/recipes" className="btn btn-primary">Browse Recipes</Link>
      </section>

      <section>
        <h2 className="section-title">Featured Recipes</h2>
        {loading && <p className="loading">Loading recipes…</p>}
        {error && <p className="error-message">{error}</p>}
        {!loading && !error && featured.length === 0 && (
          <p className="loading">No recipes yet. Be the first to share one!</p>
        )}
        {!loading && !error && featured.length > 0 && (
          <div className="recipe-grid">
            {featured.map((recipe) => (
              <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
