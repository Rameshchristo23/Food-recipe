"use client"
import { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Grid, Card, CardContent, CardMedia, Link } from '@mui/material';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

export default function Recipes() {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return;
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      setRecipes(response.data.meals || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h2" gutterBottom align="center" sx={{ mb: 4 }}>
        Recipe Search
      </Typography>
      <TextField
        label="Enter a dish name"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <Grid item xs={12} sm={6} md={4} key={recipe.idMeal}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <NextLink href={`/recipe/${recipe.idMeal}`} passHref>
                    <Link>
                      <CardMedia
                        component="img"
                        height="140"
                        image={recipe.strMealThumb}
                        alt={recipe.strMeal}
                      />
                      <CardContent>
                        <Typography variant="h6">{recipe.strMeal}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {recipe.strInstructions.substring(0, 100)}...
                        </Typography>
                      </CardContent>
                    </Link>
                  </NextLink>
                </Card>
              </motion.div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No recipes found
          </Typography>
        )}
      </Grid>
    </Container>
  );
}
