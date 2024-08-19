import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = async (e) => {
    e.preventDefault();

    const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;
    
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching the recipes:', error);
    }
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <form onSubmit={searchRecipes}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a recipe"
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {recipes.length > 0 && (
          <ul>
            {recipes.map((recipe, index) => (
              <li key={index}>
                <h2>{recipe.recipe.label}</h2>
                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                <a href={recipe.recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
