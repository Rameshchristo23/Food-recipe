"use client";

import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

export default function NutritionWizard() {
  const [query, setQuery] = useState("");
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNutritionData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const appId = process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_ID;
    const appKey = process.env.NEXT_PUBLIC_EDAMAM_NUTRITION_KEY;

    try {
      const response = await axios.post(
        `https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`,
        {
          title: "Nutrition Analysis",
          ingr: [query],
        }
      );
      setNutritionData(response.data);
    } catch (error) {
      console.error("Error fetching the nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" align="center" gutterBottom>
          Nutrition Wizard
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <form
          onSubmit={fetchNutritionData}
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <TextField
            label="Enter ingredients (e.g., 1 cup rice)"
            variant="outlined"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={{ mr: 2, width: "400px" }}
          />
          <Button
            variant="contained"
            className="bg-red-900 hover:bg-red-800"
            type="submit"
            sx={{ height: "55px" }}
          >
            Analyze
          </Button>
        </form>
      </motion.div>

      {loading && (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {nutritionData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Nutrition Facts
              </Typography>
              <div className="flex justify-between py-2 px-2 bg-slate-200 rounded-md shadow-xl">
                <Typography variant="body1">
                    Calories: {nutritionData.calories}
                </Typography>
                <Typography variant="body1">
                    Total Weight: {Math.round(nutritionData.totalWeight)} g
                </Typography>
                </div>
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nutrient</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Unit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.keys(nutritionData.totalNutrients).map((key) => (
                      <TableRow key={key}>
                        <TableCell component="th" scope="row">
                          {nutritionData.totalNutrients[key].label}
                        </TableCell>
                        <TableCell align="right">
                          {nutritionData.totalNutrients[key].quantity.toFixed(
                            2
                          )}
                        </TableCell>
                        <TableCell align="right">
                          {nutritionData.totalNutrients[key].unit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </Container>
  );
}
