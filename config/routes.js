const express = require('express')
const router = express.Router()
const usersController = require('../app/controllers/usersController')
const profilesController = require('../app/controllers/profilesController')
const { authenticateUser } = require('../app/middlewares/authentication')
const { check, validationResult } = require('express-validator')

router.post('/api/users/register', usersController.register)
router.post('/api/users/login', usersController.login)
router.get('/api/users/account', authenticateUser, usersController.account)
router.get('/api/profile/me', authenticateUser, profilesController.user)
router.post(
	'/api/profile',
	authenticateUser,
	// [
	// 	check('status', 'Status is required').not().isEmpty(),
	// 	check('skills', 'Skills is required').not().isEmpty(),
	// ],
	profilesController.create
)
router.get('/api/profile', profilesController.show)
router.get('/api/profile/user/:user_id', profilesController.profile)
router.delete('/api/profile', authenticateUser, profilesController.destroy)
router.get('/api/auth')

router.get('/api/posts')

module.exports = router
