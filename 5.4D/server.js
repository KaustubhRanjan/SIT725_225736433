const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// connect mongodb
mongoose.connect('mongodb://localhost:27017/booksDB');

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});

app.use(express.static('public'));
app.use(express.json());

// books routes
const bookRoutes = require('./routes/books.routes');
app.use('/api/books', bookRoutes);

// integrity check route
app.get('/api/integrity-check42', (req, res) => {
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});