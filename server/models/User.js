const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { salt_i, secret } = require('../config');

const Schema = mongoose.Schema;

const User = new Schema({
	email: {
		type: String,
		required: [true, 'Поле Email обязательно для заполнения.'],
		unique: true,
		trim: true,
		minlength: [7, 'Адрес электронный почты слишком короткий.'],
		maxlength: [256, 'Адрес электронный почты слишком длинный.'],
		match: [
			/^[a-zA-Z0-9'._%+-]+@[a-zA-Z0-9-][a-zA-Z0-9.-]*\.[a-zA-Z]{2,63}$/,
			'Неверный формат адреса электронной почты.'
		]
	},
	password: { type: String, required: true },
	name: { type: String, maxlength: 100 },
	lastname: { type: String, maxlength: 100 },
	role: { type: Number, default: 0 },
	token: { type: String }
});

User.pre('save', function(next) {
	if (!this.isModified('password')) return next();

	bcrypt
		.hash(this.password, salt_i)
		.then(hash => {
			this.password = hash;
			next();
		})
		.catch(next);
});

User.methods.isCorrectPassword = function(password) {
	return bcrypt.compare(password, this.password);
};

User.methods.generateToken = function() {
	let token = jwt.sign(this._id.toHexString(), secret);

	this.token = token;
	this.save();
};

User.methods.deleteToken = function() {
	let user = this;
	return new Promise(function(resolve, reject) {
		user.updateOne({ $unset: { token: 1 } }, (err, user) => {
				if (err) reject(err);
				resolve(user);
			});
	})
};

// User.methods.deleteToken = function(token, cb) {
// 	let user = this;
// 	user.updateOne({ $unset: { token: 1 } }, (err, user) => {
// 			if (err) return cb(err);
// 			cb(null, user);
// 		});
// };

User.statics.findByToken = function(token) {
	let user = this;
	// let dec = jwt.verify(token, secret);
	return new Promise(function(resolve, reject) {
		jwt.verify(token, secret, function(err, decode) {
			user.findOne({ _id: decode, token }, function(err, user) {
				if (err) reject(err);
				resolve(user);
			});
		});
	});
};

module.exports = mongoose.model('User', User);
