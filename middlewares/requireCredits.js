// Custom middleware to check if user has minimum amount of credits (for specific routes only)
module.exports = (req, res, next) => {
	if (req.user.credits < 1) {
		return res.status(403).send({ error: 'Not enough credits!' });
	}
	next();
};
