const Book = require('../models/book.model');

const getAllBooks = async () => {
  return await Book.find();
};

const getBookById = async (id) => {
  return await Book.findOne({ id });
};

const createBook = async (data) => {
  const book = new Book(data);
  return await book.save();
};

const updateBook = async (id, data) => {
  return await Book.findOneAndUpdate(
    { id },
    data,
   { returnDocument: 'after', runValidators: true }
  );
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook
};