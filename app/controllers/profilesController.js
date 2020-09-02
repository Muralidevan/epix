const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { validationResult } = require('express-validator')

// Load Profile Model
const Profile = require('../models/Profile')
// Load User Model
const User = require('../models/User')

const profilesController = {}

profilesController.user = (req, res) => {
	console.log('hello')
	Profile.findOne({ user: req.user.id })
		.populate('user', ['username'])
		.then((profile) => {
			if (!profile) {
				return res
					.status(404)
					.json({ msg: 'There is no profile for this user' })
			}
			res.json(profile)
		})
		.catch((err) => res.status(404).json(err))
}

profilesController.create = (req, res) => {
	// const errors = validationResult(req)
	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() })
	// }
	const {
		company,
		location,
		website,
		bio,
		skills,
		status,
		youtube,
		twitter,
		instagram,
		linkedin,
		facebook,
	} = req.body

	//Build profile object
	const profileFields = {}
	profileFields.user = req.user.id

	if (company) profileFields.company = company
	if (website) profileFields.website = website
	if (location) profileFields.location = location
	if (bio) profileFields.bio = bio
	if (status) profileFields.status = status
	if (skills) {
		//converting skills string to array and trimming the space
		profileFields.skills = skills.split(',').map((skill) => skill.trim())
	}

	//Build social object
	profileFields.social = {}
	if (youtube) profileFields.social.youtube = youtube
	if (twitter) profileFields.social.twitter = twitter
	if (facebook) profileFields.social.facebook = facebook
	if (linkedin) profileFields.social.linkedin = linkedin
	if (instagram) profileFields.social.instagram = instagram

	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				if (profile) {
					// Update
					Profile.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: profileFields }, //{...profileFields}
						{ new: true }
					)
						.then((profile) => res.json(profile))
						.catch((err) => res.json(err.message))
				}

				//  Create and Save Profile
				profile = new Profile(profileFields)
				profile
					.save()
					.then((profile) => res.json(profile))
					.catch((err) => res.json(err.message))

				//res.send('hello')
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}

profilesController.show = (req, res) => {
	try {
		Profile.find()
			.populate('user', ['username'])
			.then((profiles) => {
				res.json(profiles)
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}

profilesController.profile = (req, res) => {
	try {
		Profile.findOne({ user: req.params.user_id })
			.populate('user', ['username'])
			.then((profile) => {
				if (!profile) {
					res.status(400).json({ msg: 'Profile Not Found' })
				}
				res.json(profile)
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		if (err.kind == 'ObjectId') {
			res.status(400).json({ msg: 'Profile Not Found' })
		}
		res.status(500).send('Server error')
	}
}
profilesController.destroy = (req, res) => {
	try {
		//Remove Profile
		Profile.findOneAndRemove({ user: req.user.id })
			.then(() => {
				//Remove User
				User.findOneAndRemove({ _id: req.user.id })
					.then(() => res.json({ msg: 'User Deleted' }))
					.catch((err) => res.json(err.message))
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
module.exports = profilesController
