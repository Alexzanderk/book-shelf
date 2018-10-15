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

router.get('/api/auth', auth, getAuth);

router.get('/api/book', getBook);
router.get('/api/books', getBooks);
router.post('/api/book_create', createBook);
router.patch('/api/book_update', updateBook);
router.delete('/api/book_delete', deleteBook);

router.post('/api/register', registration);
router.post('/api/login', login);
router.get('/api/logout', auth, logout);
router.get('/api/getReviewer', getReviewer);
router.get('/api/users', getUsers);
router.get('/api/user_posts', getUserPosts);

module.exports = router;
