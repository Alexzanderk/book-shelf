const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema(
	{
		name: { type: String, required: true},
		author: { type: String, required: true },
		review: { type: String, default: 'n/a' },
		pages: { type: String, default: 'n/a' },
		ratings: { type: Number, min: 1, max: 5 },
		price: { type: String, default: 'n/a' },
		ownerId: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Book', Book);
