const bookService = require('../services/books.service');

const allowedFields = ['id', 'title', 'author', 'year', 'genre', 'summary', 'price'];

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch {
    res.status(500).json({ message: 'Error fetching book' });
  }
};

exports.createBook = async (req, res) => {
  try {
    const extraFields = Object.keys(req.body).filter(k => !allowedFields.includes(k));
    if (extraFields.length) {
      return res.status(400).json({ message: `Unknown fields not allowed: ${extraFields.join(', ')}` });
    }

    const created = await bookService.createBook(req.body);
    res.status(201).json(created);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Duplicate ID' });
    }
    res.status(400).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const extraFields = Object.keys(req.body).filter(k => !allowedFields.includes(k));
    if (extraFields.length) {
      return res.status(400).json({ message: `Unknown fields not allowed: ${extraFields.join(', ')}` });
    }

    if ('id' in req.body) {
      return res.status(400).json({ message: 'ID cannot be changed' });
    }

    const updated = await bookService.updateBook(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};