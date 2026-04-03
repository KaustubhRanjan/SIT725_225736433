const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/recipeDB');

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected for seeding');
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

// Seed function
const seedData = async () => {
  try {
    // delete old data first
    await Recipe.deleteMany({});

    // insert new data
    await Recipe.insertMany([
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
    ]);

    console.log('Data inserted successfully');
    mongoose.connection.close();
  } catch (error) {
    console.log('Error inserting data:', error);
    mongoose.connection.close();
  }
};

seedData();