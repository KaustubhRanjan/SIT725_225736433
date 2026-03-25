const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files from public folder
app.use(express.static('public'));

// GET API endpoint
app.get('/recipes', (req, res) => {
  const recipes = [
    {
      name: "Egg Sandwich",
      ingredients: "Bread, Egg, Tomato",
      description: "A quick healthy sandwich rich in protein.",
      image: "images/sandwich.jpg"
    },
    {
      name: "Fresh Salad Bowl",
      ingredients: "Cucumber, Tomato, Lettuce",
      description: "A light and healthy salad for lunch.",
      image: "images/salad.jpg"
    },
    {
      name: "Banana Smoothie",
      ingredients: "Milk, Banana, Honey",
      description: "An easy smoothie for breakfast or post-workout.",
      image: "images/smoothie.jpg"
    }
  ];

  res.json(recipes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});