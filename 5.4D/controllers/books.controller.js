const bookService = require('../services/books.service');

const allowedFields = ['id','title','author','year','genre','summary','price'];

// GET
exports.getAllBooks = async (req, res) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

// GET by ID
exports.getBookById = async (req, res) => {
  const book = await bookService.getBookById(req.params.id);

  if (!book) return res.status(404).json({ message: "Not found" });

  res.json(book);
};

// POST (CREATE)
exports.createBook = async (req, res) => {
  try {
    const data = req.body;

    // ❌ reject unknown fields
    const keys = Object.keys(data);
    const invalid = keys.filter(k => !allowedFields.includes(k));
    if (invalid.length > 0) {
      return res.status(400).json({ message: "Unknown fields not allowed" });
    }

    const book = await bookService.createBook(data);
    res.status(201).json(book);

  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "Duplicate ID" });
    }

    res.status(400).json({ message: err.message });
  }
};

// PUT (UPDATE)
exports.updateBook = async (req, res) => {
  try {
    const data = req.body;

    // ❌ reject unknown fields
    const keys = Object.keys(data);
    const invalid = keys.filter(k => !allowedFields.includes(k));
    if (invalid.length > 0) {
      return res.status(400).json({ message: "Unknown fields not allowed" });
    }

    // ❌ ID immutable
    if (data.id) {
      return res.status(400).json({ message: "ID cannot be changed" });
    }

    const book = await bookService.updateBook(req.params.id, data);

    if (!book) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(book);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};