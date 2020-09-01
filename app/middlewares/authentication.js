const jwt = require('jsonwebtoken')
const User = require('../models/user')
const authenticateUser = (req, res, next) => {
	//get token from header
	const token = req.header('Authorization').split(' ')[1]
	let tokenData
	try {
		//verify token
		tokenData = jwt.verify(token, 'epix123')
		User.findById(tokenData._id)
			.then((user) => {
				req.user = user
				next()
			})
			.catch((err) => {
				res.json(err)
			})
	} catch (e) {
		res.json(e.message)
	}
}

// const authorizeUser = () => {

// }

module.exports = {
	authenticateUser,
}
