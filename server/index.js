const express = require('express');
const cookieParser = require('cookie-parser');
const path = requre('path');

const config = require('./config');
const { connection } = require('./service/db');
const {
	auth: { auth }
} = require('./middleware');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('client/build'));

app.use('/api/', routes);

if (process.env.NODE_ENV === 'production') {
	app.get('/*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../client', 'build', 'index.html')
		);
	});
}

app.listen(config.port, () => {
	console.log(`Server start on port: ${config.port}`);
});
