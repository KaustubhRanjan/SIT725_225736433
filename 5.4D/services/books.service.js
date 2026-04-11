const Book = require('../models/book.model');

const getAllBooks = async () => await Book.find();
const getBookById = async (id) => await Book.findOne({ id });
const createBook = async (data) => await new Book(data).save();

const updateBook = async (id, data) => {
  return await Book.findOneAndUpdate(
    { id },
    data,
    { returnDocument: 'after', runValidators: true }
  );
};

module.exports = { getAllBooks, getBookById, createBook, updateBook };