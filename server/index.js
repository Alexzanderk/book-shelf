const express = require('express');
const cookieParser = require('cookie-parser');

const config = require('./config');
const { connection } = require('./service/db');
const {auth: { auth }} = require('./middleware');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', routes)

app.listen(config.port, () => {
	console.log(`Server start on port: ${config.port}`);
});
