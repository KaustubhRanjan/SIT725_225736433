const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

const bookRoutes = require('./routes/books.routes');
app.use('/api/books', bookRoutes);

module.exports = app;