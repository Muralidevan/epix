const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const profilesController = require('../app/controllers/profilesController')
const postsController = require('../app/controllers/postsController')
const { authenticateUser } = require('../app/middlewares/authentication')
const { check } = require('express-validator')

router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.get('/api/users/account', authenticateUser, usersController.account)
router.get('/api/profile/me', authenticateUser, profilesController.user)
router.post(
	'/api/profile',
	[
		authenticateUser,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	profilesController.create
)
router.get('/api/profile', profilesController.show)
router.get('/api/profile/user/:user_id', profilesController.profile)
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
	postsController.create
)

router.get('/api/posts', authenticateUser, postsController.listall)

router.get('/api/posts/:id', authenticateUser, postsController.show)

router.delete('/api/posts/:id', authenticateUser, postsController.destroy)

router.put('/api/posts/likes/:id', authenticateUser, postsController.likes)
router.put('/api/posts/unlikes/:id', authenticateUser, postsController.unlikes)

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
