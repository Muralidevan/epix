const mongoose = require('mongoose')
const isEmail = require('validator/lib/isEmail')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 64,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (value) {
				return isEmail(value)
			},
			message: function () {
				return 'invalid email format'
			},
		},
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 128,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,

		default: Date.now,
	},
})

module.exports = mongoose.model('user', UserSchema)
