const express = require('express')

const Profile = require('../models/Profile')

const User = require('../models/User')

const Post = require('../models/Post')

const postsController = {}

postsController.create = (req, res) => {
	let imagePath
	// let imgsrc = req.body
	// thumbnail = req.body
	const body = req.body
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

	body.imgsrc = imagePath
	body.thumbnail = imagePath
	try {
		//since we are logged token stores info in req.user.id and remove password
		User.findById(req.user.id)
			.select('-password')
			.then((user) => {
				Profile.findOne({ user: req.user.id }).then((profile) => {
					//	console.log(profile.profilePic)
					const newPost = new Post({
						text: body.text,
						iso: body.iso,
						apperture: body.apperture,
						shutterspeed: body.shutterspeed,
						imgsrc: body.imgsrc,
						thumbnail: body.thumbnail,
						//name coming from the user
						username: user.username,
						//pic from porfile
						profilePic: profile.profilePic,
						//img

						user: req.user.id,
					})
					newPost
						.save()
						.then((post) => res.json(post))
						.catch((err) => res.status(400).json(err))
				})
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
postsController.listall = (req, res) => {
	try {
		//newest post first-sort
		Post.find()
			.sort({ date: -1 })
			.then((posts) => {
				res.json(posts)
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}
postsController.show = (req, res) => {
	try {
		Post.findById(req.params.id)

			.then((post) => {
				if (!post) {
					return res.status(200).json({ msg: 'Post Not found' })
				}
				res.json(post)
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(200).json({ msg: 'Post Not found' })
		}
		res.status(500).send('Server error')
	}
}
postsController.destroy = (req, res) => {
	try {
		Post.findById(req.params.id)
			.then((post) => {
				if (!post) {
					return res.status(200).json({ msg: 'Post Not found' })
				}
				//check user to delete only his post
				if (post.user.toString() !== req.user.id) {
					return res.status(404).json({ msg: 'User Not authorized' })
				}

				post.remove()
				res.json({ msg: 'Post removed' })
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'Post Not found' })
		}
		res.status(500).send('Server error')
	}
}

postsController.likes = (req, res) => {
	try {
		Post.findById(req.params.id)
			.then((post) => {
				//check if the post has been already liked
				//if (post.likes.filter((like) => like.user.toString() === req.user.id).length>0)
				if (post.likes.some((like) => like.user.toString() === req.user.id)) {
					return res.status(200).json({ msg: 'Post Already Liked' })
				}
				//pushing newest likes to likes array
				post.likes.unshift({ user: req.user.id })
				post.save()

				return res.json(post.likes)
				// .then((post) => {
				// 	res.json(post.likes)
				// })
				// .catch((err) => res.status(404).json(err))
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)

		res.status(500).send('Server error')
	}
}

postsController.unlikes = (req, res) => {
	try {
		Post.findById(req.params.id)
			.then((post) => {
				//check if the post has not yet been liked
				//if (post.likes.filter((like) => like.user.toString() === req.user.id).length==0)
				if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
					return res.status(200).json({ msg: 'Post Has Not Yet Been  Liked' })
				}
				//remove the like
				post.likes = post.likes.filter(
					({ user }) => user.toString() !== req.user.id
				)
				post.save()

				return res.json(post.likes)
				// .then((post) => {
				// 	res.json(post.likes)
				// })
				// .catch((err) => res.status(404).json(err))
			})
			.catch((err) => res.status(404).json(err))
	} catch (err) {
		console.error(err.message)

		res.status(500).send('Server error')
	}
}
postsController.createComment = (req, res) => {
	try {
		//since we are logged token stores info in req.user.id and remove password
		User.findById(req.user.id)
			.select('-password')
			.then((user) => {
				Post.findById(req.params.id)
					.then((post) => {
						Profile.findOne({ user: req.user.id }).then((profile) => {
							const newComment = {
								text: req.body.text,
								//name coming from the user
								username: user.username,
								user: req.user.id,
								profilePic: profile.profilePic,
							}

							post.comments.unshift(newComment)
							post.save()
							res.json(post.comments)
						})
					})
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
postsController.deleteComment = (req, res) => {
	try {
		Post.findById(req.params.id)
			.then((post) => {
				// Get comment
				const comment = post.comments.find(
					(comment) => comment.id === req.params.comment_id
				)
				// To Check if comment exists or not
				if (!comment) {
					return res.status(200).json({ msg: 'Comment does not exist' })
				}
				// Check user and because comment.user gives ObjectId -use toString()
				if (comment.user.toString() !== req.user.id) {
					return res.status(200).json({ msg: 'User not authorized' })
				}

				post.comments = post.comments.filter(
					({ id }) => id !== req.params.comment_id
				)
				post.save()
				res.json(post.comments)
			})
			.catch((err) => {
				console.error(err.message)
			})
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server error')
	}
}

module.exports = postsController
