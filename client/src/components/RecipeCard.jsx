import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  const description = recipe.description && recipe.description.length > 100
    ? recipe.description.slice(0, 100) + '…'
    : recipe.description;

  return (
    <Link to={`/recipes/${recipe._id || recipe.id}`} className="recipe-card">
      <h3>{recipe.title}</h3>
      <p>{description}</p>
      <span className="author">by {recipe.author}</span>
    </Link>
  );
}
