module.exports = {
	version: '1.0.0',
	port: process.env.PORT || 3001,
	mongodbUri:
		process.env.NODE_ENV === 'development'
			? 'mongodb://localhost:27017/book-shelf'
			: process.env.MONGODB_URI,
	secret: process.env.SECRET,
	salt_i: 10
};
