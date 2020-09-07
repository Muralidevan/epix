import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { startLoginUser } from '../../actions/userAction'
//for connecting component to the store
import { connect } from 'react-redux'

const Login = (props, isAuthenticated) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
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
	const { email, password } = formData

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const newUser = {
			email,
			password,
		}
		props.startLoginUser(newUser)
		if (isAuthenticated) {
			return <Redirect to='/login' />
		}
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => {
							handleChange(e)
						}}
						required
					/>
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
						required
						minLength='6'
					/>
				</div>

				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Dont't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	)
}

Login.propTypes = {
	startLoginUser: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps, { startLoginUser })(Login) //startlogin to use as props
