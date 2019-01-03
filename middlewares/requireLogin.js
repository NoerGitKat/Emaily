// Custom middleware to check if user is logged in (for specific routes only)
module.exports = (req, res, next) => {
	if (!req.user) {
		return res.status(401).send({ error: 'You must log in to see this content!' });
	}
	next();
};
