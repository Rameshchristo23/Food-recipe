"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Card, CardContent, CardMedia, List, ListItem, ListItemText, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { useParams } from 'next/navigation'; // Import useParams for dynamic routing
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantMenuTwoToneIcon from '@mui/icons-material/RestaurantMenuTwoTone';

// Function to generate image URL for each ingredient
const getIngredientImageUrl = (ingredient) => 
  `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}.png`;

export default function RecipeDetail() {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams(); // Use useParams to get route parameters

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        try {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
          setRecipe(response.data.meals[0]);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
      fetchRecipe();
    }
  }, [id]);

  if (!id) {
    return <Typography>Loading...</Typography>;
  }

  if (!recipe) {
    return <Typography>No recipe found</Typography>;
  }

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className='p-12 shadow-md shadow-red-800'>
          <div className='grid grid-cols-2 gap-2'>
            <CardMedia
              component="img"
              className='w-[300px] h-[300px] object-fit-cover flex mx-auto rounded-full drop-shadow-2xl shadow-red-400'
              image={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <Typography variant="h2" gutterBottom align="center" alignSelf='center'>
              {recipe.strMeal}
            </Typography>
          </div>

          <CardContent>
            <Accordion
              sx={{ mb: 2 }}
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={<RestaurantMenuTwoToneIcon />}
                id="ingredients-header"
              >
                <Typography variant="h6">Ingredients</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List className='grid grid-cols-4'>
                  {[...Array(20)].map((_, i) => {
                    const ingredient = recipe[`strIngredient${i + 1}`];
                    const measure = recipe[`strMeasure${i + 1}`];
                    return ingredient ? (
                      <ListItem key={i} alignItems="flex-start">
                        <Card className='w-full shadow-inner shadow-red-700 px-5 py-3'>
                          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <CardMedia
                              component="img"
                              sx={{ height: 150, mr: 2, objectFit: 'contain' }}
                              className='drop-shadow-2xl'
                              image={getIngredientImageUrl(ingredient)}
                              alt={ingredient}
                              onError={(e) => e.target.src = 'https://via.placeholder.com/50?text=Image+Not+Available'} // Fallback image
                            />
                            <ListItemText className='pt-3' primary={`${measure} ${ingredient}`} />
                          </Box>
                        </Card>
                      </ListItem>
                    ) : null;
                  })}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion
              TransitionProps={{ unmountOnExit: true }}
            >
              <AccordionSummary
                expandIcon={<RestaurantMenuTwoToneIcon />}
                id="instructions-header"
              >
                <Typography variant="h6">Instructions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{recipe.strInstructions}</Typography>
              </AccordionDetails>
            </Accordion>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
}
