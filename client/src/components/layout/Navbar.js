import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { startUserLogout } from '../../actions/userAction'
import Swal from 'sweetalert2'

const Navbar = ({
	user: { isAuthenticated, loading },
	user: { user },
	startUserLogout,
}) => {
	const handleLogout = () => {
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 2000,

			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
		})

		Toast.fire({
			icon: 'success',
			title: 'Signed Out Successfully',
		})
		setTimeout(() => startUserLogout(), 1000)
	}
	// if (!loading) {
	// 	console.log(user._id, 'user')
	// }

	const authLinks = (
		<ul>
			<li>
				{!loading && (
					<Link to={`/gallery/${user._id}`}>
						<i className='fa fa-picture-o' aria-hidden='true'></i>&nbsp;GALLERY
					</Link>
				)}
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
			{/* <li>
				<Link to='/profiles'>
					<i className='fa fa-camera' aria-hidden='true'></i>&nbsp;PHOTOGRAPHERS
				</Link>
			</li> */}
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
