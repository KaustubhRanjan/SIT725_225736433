const mongoose = require('mongoose');

const currentYear = new Date().getFullYear();

const bookSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'id is required'],
    unique: true,
    match: [/^b[0-9]+$/, 'id must be like b1, b2']
  },
  title: {
    type: String,
    required: [true, 'title is required'],
    minlength: [3, 'title must be at least 3 characters'],
    maxlength: [100, 'title must be at most 100 characters'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'author is required'],
    minlength: [3, 'author must be at least 3 characters'],
    maxlength: [80, 'author must be at most 80 characters'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'year is required'],
    min: [1500, 'year must be 1500 or later'],
    max: [currentYear, 'year cannot be in the future']
  },
  genre: {
    type: String,
    required: [true, 'genre is required'],
    minlength: [3, 'genre must be at least 3 characters'],
    maxlength: [40, 'genre must be at most 40 characters'],
    trim: true
  },
  summary: {
    type: String,
    required: [true, 'summary is required'],
    minlength: [10, 'summary must be at least 10 characters'],
    maxlength: [500, 'summary must be at most 500 characters'],
    trim: true
  },
  price: {
    type: mongoose.Schema.Types.Decimal128,
    required: [true, 'price is required'],
    validate: {
      validator: function (v) {
        return parseFloat(v.toString()) > 0;
      },
      message: 'price must be greater than 0'
    }
  }
});

module.exports = mongoose.model('Book', bookSchema);