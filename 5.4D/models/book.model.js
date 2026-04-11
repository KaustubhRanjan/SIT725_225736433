const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    match: /^b[0-9]+$/   // must be like b1, b2
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  author: {
    type: String,
    required: true,
    minlength: 3
  },
  year: {
    type: Number,
    required: true,
    min: 1500,
    max: new Date().getFullYear()
  },
  genre: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true,
    minlength: 10
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: true
  }
});

module.exports = mongoose.model('Book', bookSchema);