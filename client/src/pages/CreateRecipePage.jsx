import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateRecipePage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    author: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload = {
      ...form,
      ingredients: form.ingredients
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      await axios.post('/api/recipes', payload);
      navigate('/recipes');
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to create recipe. Please try again.';
      setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="form-page">
      <h1>Share a Recipe</h1>

      {error && <p className="form-error">{error}</p>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. Classic Spaghetti Carbonara"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="A short description of your recipe…"
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ingredients">Ingredients *</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
            placeholder="200g spaghetti&#10;3 eggs&#10;100g pancetta"
            rows={6}
          />
          <span className="form-hint">One ingredient per line</span>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions *</label>
          <textarea
            id="instructions"
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            placeholder="Step-by-step instructions…"
            rows={8}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Your Name *</label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            required
            placeholder="e.g. Jane Smith"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={submitting}
        >
          {submitting ? 'Sharing…' : 'Share Recipe'}
        </button>
      </form>
    </div>
  );
}
