const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const ProfileSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'user',
	},
	company: {
		type: String,
	},

	location: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	website: {
		type: String,
		required: true,
	},
	skills: {
		type: [String],
		required: true,
	},
	bio: {
		type: String,
	},
	profilePic: {
		type: String,
	},

	experience: [
		{
			title: {
				type: String,
				required: true,
			},
			company: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	certifications: [
		{
			title: {
				type: String,
				required: true,
			},
			organization: {
				type: String,
				required: true,
			},
			location: {
				type: String,
			},
			from: {
				type: Date,
				required: true,
			},
			to: {
				type: Date,
			},
			current: {
				type: Boolean,
				default: false,
			},
			description: {
				type: String,
			},
		},
	],
	social: {
		youtube: {
			type: String,
		},
		twitter: {
			type: String,
		},
		facebook: {
			type: String,
		},
		linkedin: {
			type: String,
		},
		instagram: {
			type: String,
		},
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('profile', ProfileSchema)

// const Profile = mongoose.model('Profile', ProfileSchema)

// module.exports = Profile
