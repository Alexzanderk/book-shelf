const { User } = require('../models');

module.exports = {
	auth(req, res, next) {
		let token = req.cookies.auth;
		User.findByToken(token)
			.then(user => {
                if (!user) return res.json({error: true, msg: 'User not auth'})
				req.token = token;
				req.user = user;
				next();
			})
			.catch(next);
		// User.findByToken(token, function(err, user) {
		// 	if (err) throw err;
		// 	if (!user) return res.json({ error: true });

		// 	req.token = token;
		// 	req.user = user;
		// 	next();
		// });
	}
};
