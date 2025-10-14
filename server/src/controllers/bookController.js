const Book = require('../models/Book');
const { validationResult } = require('express-validator');


// GET /api/books
exports.getBooks = async (req, res, next) => {
try {
const { search, status, genre } = req.query;
const query = {};
if (status) query.status = status;
if (genre) query.genre = genre;
if (search) query.$or = [
{ title: new RegExp(search, 'i') },
{ author: new RegExp(search, 'i') },
];


const books = await Book.find(query).sort({ createdAt: -1 });
res.json(books);
} catch (err) {
next(err);
}
};


// POST /api/books
exports.addBook = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { title, author, genre, status, progress } = req.body;
const book = new Book({ title, author, genre, status, progress });
const saved = await book.save();
res.status(201).json(saved);
} catch (err) {
next(err);
}
};


// PUT /api/books/:id
exports.updateBook = async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { id } = req.params;
const updated = await Book.findByIdAndUpdate(id, req.body, { new: true });
if (!updated) return res.status(404).json({ message: 'Book not found' });
res.json(updated);
} catch (err) {
next(err);
}
};


// DELETE /api/books/:id
exports.deleteBook = async (req, res, next) => {
try {
const { id } = req.params;
const removed = await Book.findByIdAndDelete(id);
if (!removed) return res.status(404).json({ message: 'Book not found' });
res.json({ message: 'Book deleted' });
} catch (err) {
next(err);
}
};