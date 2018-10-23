const router = require('express').Router();
const {
	auth: { auth }
} = require('../middleware');
const {
	getAuth,
	getBook,
	getBooks,
	createBook,
	updateBook,
	deleteBook,
	registration,
	login,
	logout,
	getReviewer,
	getUsers,
	getUserPosts
} = require('../controllers');

router.get('/auth', auth, getAuth);

router.get('/book', getBook);
router.get('/books', getBooks);
router.post('/book_create', createBook);
router.patch('/book_update', updateBook);
router.delete('/book_delete', deleteBook);

router.post('/register', registration);
router.post('/login', login);
router.get('/logout', auth, logout);
router.get('/getReviewer', getReviewer);
router.get('/users', getUsers);
router.get('/user_posts', getUserPosts);

module.exports = router;
