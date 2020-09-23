import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startUserLogout } from '../../actions/userAction'

const Navbar = ({ user: { isAuthenticated }, startUserLogout }) => {
	const handleLogout = () => {
		startUserLogout()
	}

	const authLinks = (
		<ul>
			<li>
				<Link to='/gallery'>
					<i className='fa fa-picture-o' aria-hidden='true'></i>&nbsp;GALLERY
				</Link>
			</li>
			<li>
				<Link to='/profiles'>
					<i className='fa fa-camera' aria-hidden='true'></i>&nbsp;PHOTOGRAPHERS
				</Link>
			</li>

			<li>
				<Link to='/posts'>
					<i className='fa fa-product-hunt' aria-hidden='true'></i>&nbsp;POSTS
				</Link>
			</li>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user'>
						{' '}
						<span className='hide-sm'></span>
					</i>
					&nbsp;PROFILE
				</Link>
			</li>
			<li>
				<Link to='/' onClick={handleLogout}>
					<i className='fas fa-sign-out-alt'></i>
					{''}
					<span className='hide-sm'>&nbsp;SIGNOUT</span>
				</Link>
			</li>
		</ul>
	)
	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>
					<i className='fa fa-camera' aria-hidden='true'></i>&nbsp;PHOTOGRAPHERS
				</Link>
			</li>
			<li>
				<Link to='/register'>
					<i className='fa fa-handshake-o' aria-hidden='true'></i>&nbsp;SIGNUP
				</Link>
			</li>
			<li>
				<Link to='/login'>
					<i className='fa fa-sign-in' aria-hidden='true'></i>&nbsp;SIGNIN
				</Link>
			</li>
		</ul>
	)
	return (
		<nav className='navbar bg-dark primary-color'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> EPIX
				</Link>
			</h1>

			<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
		</nav>
	)
}

Navbar.propTypes = {
	startUserLogout: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	user: state.user,
})

export default connect(mapStateToProps, { startUserLogout })(Navbar)
