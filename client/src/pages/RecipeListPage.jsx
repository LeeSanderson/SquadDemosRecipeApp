import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const { data } = await axios.get('/api/recipes');
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  const filtered = recipes.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="page-header">
        <h1 className="section-title" style={{ margin: 0 }}>All Recipes</h1>
        <input
          type="search"
          className="search-input"
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search recipes"
        />
      </div>

      {loading && <p className="loading">Loading recipes…</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="loading">
          {search ? 'No recipes match your search.' : 'No recipes yet.'}
          {!search && (
            <>
              {' '}
              <Link to="/recipes/new">Share the first one!</Link>
            </>
          )}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="recipe-grid">
          {filtered.map((recipe) => (
            <RecipeCard key={recipe._id || recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </>
  );
}
