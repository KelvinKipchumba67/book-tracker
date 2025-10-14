const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const bookController = require('../controllers/bookController');


const validators = [
body('title').notEmpty().withMessage('Title is required'),
body('author').notEmpty().withMessage('Author is required'),
body('status').optional().isIn(['to read', 'reading', 'finished']),
body('progress').optional().isFloat({ min: 0, max: 100 }),
];


router.get('/', bookController.getBooks);
router.post('/', validators, bookController.addBook);
router.put('/:id', validators, bookController.updateBook);
router.delete('/:id', bookController.deleteBook);


module.exports = router;