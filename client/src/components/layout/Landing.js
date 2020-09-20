import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />
	}
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large' style={{ textAlignLast: 'center' }}>
						ePix
					</h1>
					<p className='lead' style={{ textAlignLast: 'center' }}>
						Create a photographer profile/portfolio, share posts and connect
						with other photographers
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Sign Up
						</Link>
						<Link to='/login' className='btn btn-primary'>
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</section>
	)
}

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
}
const mapStateToProps = (state) => ({
	isAuthenticated: state.user.isAuthenticated,
})

export default connect(mapStateToProps)(Landing)
