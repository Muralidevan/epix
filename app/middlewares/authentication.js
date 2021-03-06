const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('config')
const authenticateUser = (req, res, next) => {
	//get token from header
	// config.get('jwtSecret')
	//console.log(req.header('Authorization'))
	const token = req.header('Authorization').split(' ')[1]

	try {
		//verify token
		jwt.verify(token, 'epix123', (error, decoded) => {
			if (error) {
				return res.status(401).json({ msg: 'Token is not valid' })
			} else {
				req.user = decoded.user
				next()
			}
		})
	} catch (e) {
		// User.findById(tokenData._id)
		// 	.then((user) => {
		// 		req.user = user
		// 		next()
		// 	})
		// 	.catch((err) => {
		// 		res.json(err)
		// 	})
		res.json(e.message)
	}
}

// const authorizeUser = () => {

// }

module.exports = {
	authenticateUser,
}
