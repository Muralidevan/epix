const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const profilesController = require('../app/controllers/profilesController')
const postsController = require('../app/controllers/postsController')
const { authenticateUser } = require('../app/middlewares/authentication')
const { check } = require('express-validator')
const checkObjectId = require('../app/middlewares/checkObjectId')
const multer = require('multer')
const multerConf = require('../app/middlewares/upload')

router.post(
	'/api/users/register',
	[
		check('username', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({ min: 6 }),
	],
	usersController.register
)
router.post(
	'/api/users/login',
	check('email', 'Please include a valid email').isEmail(),
	check(
		'password',
		'Please enter a password with 6 or more characters'
	).isLength({ min: 6 }),
	usersController.login
)

router.get('/api/users/account', authenticateUser, usersController.account)
router.get('/api/profile/me', authenticateUser, profilesController.user)

router.post(
	'/api/profile',
	[
		authenticateUser,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
			check('website', 'Website is required').not().isEmpty(),
		],
	],

	profilesController.create
)
router.post(
	'/api/profilepic',
	[authenticateUser],
	multer(multerConf).single('profilePic'),
	profilesController.profilePicture
)
router.get('/api/profile', profilesController.show)
router.get(
	'/api/profile/:user_id',
	checkObjectId('user_id'),
	profilesController.profile
)
router.delete('/api/profile', authenticateUser, profilesController.destroy)
router.put(
	'/api/profile/experience',
	[
		authenticateUser,
		[
			(check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty()),
		],
	],
	profilesController.profileExperience
)
router.delete(
	'/api/profile/experience/:exp_id',
	authenticateUser,
	profilesController.destroyExperience
)
router.put(
	'/api/profile/certifications',
	[
		authenticateUser,
		[
			(check('title', 'Title is required').not().isEmpty(),
			check('organization', 'Organization is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty()),
		],
	],
	profilesController.profileCertifications
)
router.delete(
	'/api/profile/certifications/:cer_id',
	authenticateUser,
	profilesController.destroyCertifications
)

router.post(
	'/api/posts',
	[authenticateUser, [check('text', 'Text is required').not().isEmpty()]],
	multer(multerConf).single('imgsrc'),
	postsController.create
)

router.get('/api/posts', authenticateUser, postsController.listall)

router.get('/api/posts/:id', authenticateUser, postsController.show)

router.delete(
	'/api/posts/:id',
	authenticateUser,
	checkObjectId('id'),
	postsController.destroy
)

router.put('/api/posts/likes/:id', authenticateUser, postsController.likes)
router.put(
	'/api/posts/unlikes/:id',
	authenticateUser,
	checkObjectId('id'),
	postsController.unlikes
)

router.post(
	'/api/posts/comment/:id',
	authenticateUser,
	postsController.createComment
)
//need comment id to know which comment to delete
router.delete(
	'/api/posts/comment/:id/:comment_id',
	authenticateUser,
	postsController.deleteComment
)

module.exports = router
