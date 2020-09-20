const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	profile: {
		type: Schema.Types.ObjectId,
		ref: 'profile',
	},
	text: {
		type: String,
		required: true,
	},
	iso: {
		type: String,
	},
	apperture: {
		type: String,
	},
	shutterspeed: {
		type: String,
	},
	imgsrc: {
		type: String,
	},
	// thumbnail: {
	// 	type: String,
	// },
	username: {
		type: String,
	},
	profilePic: {
		type: String,
	},
	likes: [
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
		},
	],
	comments: [
		{
			profile: {
				type: Schema.Types.ObjectId,
				ref: 'profile',
			},
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			text: {
				type: String,
				required: true,
			},
			date: {
				type: Date,
				default: Date.now,
			},
			username: {
				type: String,
			},
			profilePic: {
				type: String,
			},
		},
	],
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Post = mongoose.model('post', PostSchema)
