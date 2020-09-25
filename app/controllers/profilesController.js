const { validationResult } = require('express-validator')
// Load Profile Model
const Profile = require('../models/Profile')
//Load User Model
const User = require('../models/User')
const Post = require('../models/Post')
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url')

const profilesController = {}

profilesController.user = (req, res) => {
	//console.log('hello')
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
	// console.log(req.body)
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(404).json({ errors: errors.array() })
	}
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

	//build profile object
	const profileFields = {}

	profileFields.user = req.user.id
	if (company) profileFields.company = company
	if (website) profileFields.website = website
	if (location) profileFields.location = location
	if (bio) profileFields.bio = bio
	if (status) profileFields.status = status
	if (skills) {
		profileFields.skills = skills.split(',').map((skill) => skill.trim())
	}

	// Build social object and add to profileFields
	// Build social object and add to profileFields
	const socialfields = { youtube, twitter, instagram, linkedin, facebook }

	for (const [key, value] of Object.entries(socialfields)) {
		if (value && value.length > 0)
			socialfields[key] = normalize(value, { forceHttps: true })
	}
	profileFields.social = socialfields

	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				//console.log(profile)
				// Update
				if (profile) {
					Profile.findOneAndUpdate(
						{ user: req.user.id },
						{ $set: profileFields }, //{...profileFields}
						{ new: true }
					)
						.then((profile) => res.json(profile))
						.catch((err) => res.json(err.message))
				}
				if (!profile) {
					//  Create and Save Profile
					profile = new Profile(profileFields)
					profile
						.save()
						.then((profile) => res.json(profile))
						.catch((err) => res.json(err.message))
				}

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
			.populate('user', ['username', 'profilePic'])
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
			.populate('user', ['username', 'profilePic'])
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
		//Remove user Posts
		Post.deleteMany({ user: req.user.id })

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
profilesController.profileExperience = (req, res) => {
	const { title, company, location, from, to, current, description } = req.body

	const newExp = { title, company, location, from, to, current, description }

	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// Add to exp array newest first(unshift)
				profile.experience.unshift(newExp)

				profile
					.save()
					.then((profile) => res.json(profile))
					.catch((err) => {
						console.error(err.message)
					})
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
profilesController.profilePicture = (req, res) => {
	//console.log(req.body, req.file)
	let imagePath
	let profilePic = req.body
	if (req.file) {
		// dest = req.file.destination
		imagePath =
			req.protocol +
			'://' +
			req.get('host') +
			'/public/uploads/' +
			req.file.filename
	}
	//console.log(imagePath)
	//Build profile object

	profilePic = imagePath

	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				if (profile) {
					// Update
					Profile.findOneAndUpdate(
						{ user: req.user.id },
						{ profilePic }, //{...body}
						{ new: true }
					)
						.then((profile) => res.json(profile))
						.catch((err) => res.json(err.message))
				}
				profile.profilePic = profilePic
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
profilesController.destroyExperience = (req, res) => {
	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				profile.experience = profile.experience.filter(
					(exp) => exp._id.toString() !== req.params.exp_id
				)
				// // Get remove index
				// const removeIndex = profile.experience
				// 	.map((item) => item.id)
				// 	.indexOf(req.params.exp_id)

				// // Splice out of array
				// profile.experience.splice(removeIndex, 1)

				// Save
				profile
					.save()
					.then((profile) => res.json(profile))
					.catch((err) => {
						console.error(err.message)
					})
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
profilesController.profileCertifications = (req, res) => {
	const {
		title,
		organization,
		location,
		from,
		to,
		current,
		description,
	} = req.body

	const newCer = {
		title,
		organization,
		location,
		from,
		to,
		current,
		description,
	}

	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				// Add to Certifications array newest first(unshift)
				profile.certifications.unshift(newCer)

				profile
					.save()
					.then((profile) => res.json(profile))
					.catch((err) => {
						console.error(err.message)
					})
			})
			.catch((err) => res.json(err.message))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
profilesController.destroyCertifications = (req, res) => {
	//console.log('hello')
	try {
		Profile.findOne({ user: req.user.id })
			.then((profile) => {
				profile.certifications = profile.certifications.filter(
					(cer) => cer._id.toString() !== req.params.cer_id
				)

				// Save
				profile
					.save()
					.then((profile) => res.json(profile))
					.catch((err) => {
						console.error(err.message)
					})
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}

module.exports = profilesController
