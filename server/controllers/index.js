const { User, Book } = require('../models');
module.exports = {
	// GET /api/auth
	getAuth(req, res) {
		res.json({
			isAuth: true,
			id: req.user._id,
			email: req.user.email,
			name: req.user.name,
			lastname: req.user.lastname
		});
	},

	// GET /api/book?id=...
	getBook(req, res) {
		let id = req.query.id;
		Book.findById(id)
			.then(book => {
				res.status(200).json({ book });
			})
			.catch(err => {
				res.status(400).send(err);
			});
	},

	//GET /api/books?skip=1&limit=3&order=desk
	getBooks(req, res) {
		let skip = parseInt(req.query.skip);
		let limit = parseInt(req.query.limit);
		let order = req.query.order;

		Book.find()
			.sort({ _id: order })
			.skip(skip)
			.limit(limit)
			.then(books => {
				res.json(books);
			})
			.catch(err => {
				res.status(400).send(err);
			});
	},

	//POST /api/book_create
	createBook(req, res) {
		const book = new Book(req.body);
		book.save((err, doc) => {
			if (err) return res.status(400).send(err);

			res.status(200).json({
				post: true,
				bookId: doc._id
			});
		});
	},

	//PATCH /api/book_update
	updateBook(req, res) {
		Book.findByIdAndUpdate(req.body._id, req.body, { new: true })
			.then(newBook => {
				res.json({
					success: true,
					newBook
				});
			})
			.catch(err => {
				res.status(400).send(err);
			});
	},
	//DELETE  /api/book_delete
	deleteBook(req, res) {
		let id = req.query.id;

		Book.findByIdAndRemove(id)
			.then(() => {
				res.json(true);
			})
			.catch(err => {
				res.status(400).json(err);
			});
	},

	//POST /api/register/
	registration(req, res) {
		User.create(req.body)
			.then(user => {
				res.json({ success: true, user });
			})
			.catch(err => {
				res.status(400).json({ success: false, err });
			});
	},

	//POST /api/login
	login(req, res) {
		User.findOne({ email: req.body.email })
			.then(user => {
				if (!user) {
					res.status(400).json({
						isAuth: false,
						message: 'Auth failed, wrong email!'
					});
				}

				user.isCorrectPassword(req.body.password)
					.then(isEqual => {
						if (!isEqual) {
							return res.status(201).json({
								isAuth: false,
								message: 'Wrong password'
							});
						}

						user.generateToken();
						if (!user.token)
							return res.status(201).json({ isAuth: false });
						res.cookie('auth', user.token).json({
							isAuth: true,
							id: user.id,
							email: user.email
						});
					})
					.catch(err => res.status(400).send(err));
			})
			.catch(err => res.status(400).send(err));
	},

	//GET /api/logout
	logout(req, res) {
		req.user
			.deleteToken()
			.then(() => {
				res.sendStatus(200);
			})
			.catch(err => {
				res.status(400);
			});
	},

	//GET /api/getReviewer
	getReviewer(req, res) {
		let id = req.query.id;

		User.findById(id)
			.then(user => {
				res.json({
					name: user.name,
					lastname: user.lastname
				});
			})
			.catch(err => res.status(400).send(err));
	},

	//GET /api/users
	getUsers(req, res) {
		User.find()
			.then(users => {
				if (!users) return res.status(400).send(users);
				res.json({ users });
			})
			.catch(err => res.status(400).send(err));
	},

	//GET /api/user_posts
	getUserPosts(req, res) {
		Book.find({ ownerId: req.query.user })
			.then(books => {
				res.json({ books });
			})
			.catch(err => res.status(400).json(err));
	}
};
