import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

import { startRegisterUser } from '../../actions/userAction'
//for connecting component to the store
import { connect } from 'react-redux'
import { setAlert } from '../../actions/alertAction'

import PropTypes from 'prop-types' //impt

const Register = (props, isAuthenticated) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		password2: '',
	})
	//formData
	// this.state = {
	//     formData:{
	//         name:'',
	//         email:'',
	//     }
	// }
	//setFormData
	//this.setState()

	//object destructuring
	const { username, email, password, password2 } = formData

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		if (password !== password2) {
			props.setAlert('Passwords do not match', 'danger') //msg-alert msg,danger-alertType
		} else {
			// props.startRegisterUser(name, email, password)
			const newUser = {
				username,
				email,
				password,
			}
			const redirect = () => {
				return <Redirect to='/login' />
			}

			props.startRegisterUser(newUser, redirect)
		}
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='username'
						value={username}
						onChange={(e) => {
							handleChange(e)
						}}
						//required
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => {
							handleChange(e)
						}}
						//required
					/>
					<small className='form-text'>
						{/* This site uses Gravatar so if you want a profile image, use a
						Gravatar email */}
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => {
							handleChange(e)
						}}
						// required
						// minLength='6'
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={(e) => {
							handleChange(e)
						}}
						// required
						// minLength='6'
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Fragment>
	)
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired, //ptfr-es7 snippet
	startRegisterUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool, //ptb
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.user.isAuthenticated,
})

//get state from alert -first parameter,second object with action
export default connect(mapStateToProps, {
	setAlert,
	startRegisterUser,
})(Register)