import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { startLoginUser } from '../../actions/userAction'
//for connecting component to the store
import { connect } from 'react-redux'

const Login = (props, { user }) => {
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
	let history = useHistory()

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const onSubmit = (e) => {
		e.preventDefault()
		const newUser = {
			email,
			password,
		}
		const redirect = () => {
			return history.push('/dashboard')
		}
		props.startLoginUser(newUser, redirect)
	}

	return (
		<Fragment>
			<h1 className='large text-primary' style={{ textAlignLast: 'center' }}>
				Sign In
			</h1>
			<p className='lead' style={{ textAlignLast: 'center' }}>
				<i className='fas fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group-login'>
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
				<div className='form-group-login'>
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

				<input type='submit' className='btn btn-login' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</p>
		</Fragment>
	)
}

Login.propTypes = {
	startLoginUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, { startLoginUser })(Login) //startlogin to use as props
