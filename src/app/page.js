"use client"
import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

export default function Search() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async (e) => {
    e.preventDefault();
    setLoading(true);

    const appId = process.env.NEXT_PUBLIC_EDAMAM_APP_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_APP_KEY;
    
    try {
      const response = await axios.get(
        `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
      );
      setRecipes(response.data.hits);
    } catch (error) {
      console.error('Error fetching the recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Recipe Search
      </Typography>
      <form onSubmit={searchRecipes} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <TextField
          label="Search for a recipe"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ mr: 2, width: '300px' }}
        />
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>

      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      <Grid container spacing={3}>
        {recipes.length > 0 && recipes.map((recipe, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={recipe.recipe.image}
                  alt={recipe.recipe.label}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {recipe.recipe.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Calories: {Math.round(recipe.recipe.calories)}
                  </Typography>
                </CardContent>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  href={recipe.recipe.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  View Recipe
                </Button>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
