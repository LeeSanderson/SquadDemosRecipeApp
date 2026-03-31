import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">RecipeShare</Link>
      <ul className="navbar-links">
        <li><Link to="/recipes">Browse</Link></li>
        <li><Link to="/recipes/new">Share Recipe</Link></li>
      </ul>
    </nav>
  );
}
