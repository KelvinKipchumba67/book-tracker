const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
title: { type: String, required: true },
author: { type: String, required: true },
genre: { type: String },
status: {
type: String,
enum: ['to read', 'reading', 'finished'],
default: 'to read',
},
progress: { type: Number, min: 0, max: 100, default: 0 },
createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Book', bookSchema);