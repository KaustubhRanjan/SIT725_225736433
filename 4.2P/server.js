const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipeDB');

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

// Recipe Schema
const RecipeSchema = new mongoose.Schema({
  name: String,
  ingredients: String,
  description: String,
  image: String
});

// Recipe Model
const Recipe = mongoose.model('Recipe', RecipeSchema);

// Serve static files from public folder
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// GET API endpoint
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});