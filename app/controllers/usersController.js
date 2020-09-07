const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersController = {}

usersController.register = (req, res) => {
	const body = req.body

	User.findOne({ email: body.email }).then((user) => {
		if (user) {
			return res.json({ errors: 'User Already Exists' })
		}
	})
	const user = new User(body)

	bcryptjs.genSalt().then((salt) => {
		bcryptjs.hash(user.password, salt).then((encrypted) => {
			user.password = encrypted
			user
				.save()
				.then((user) => {
					res.json(user)
				})
				.catch((err) => {
					res.json(err)
				})
		})
	})

	/*
    const user - new User()
    user.username= body.username
    user.email= body.email
    user.password= body.password
    */
}
usersController.login = (req, res) => {
	const body = req.body
	User.findOne({ email: body.email }).then((user) => {
		if (!user) {
			res.json({ errors: 'Invalid email or password' })
		}
		bcryptjs.compare(body.password, user.password).then((match) => {
			if (match) {
				const tokenData = {
					user: {
						id: user.id,
					},
					//return user.generateToken()
				}
				const token = jwt.sign(tokenData, 'epix123', { expiresIn: '5 days' })
				res.json({
					token: `Bearer ${token}`,
				})
			} else {
				res.json({ errors: 'Invalid email or password' })
			}
		})
	})
}
usersController.account = (req, res) => {
	try {
		//console.log(req.body)
		const user = User.findById(req.user.id)
			.select('-password')
			.then((user) => {
				res.json(user)
			})
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
	//res.json(req.user) //{ notice: 'user account info' }
}

module.exports = usersController
