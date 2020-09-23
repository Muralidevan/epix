import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import ProfileItem from './ProfileItem'

import { connect } from 'react-redux'
import { getAllUserProfile } from '../../actions/profileAction'

const Profiles = ({ getAllUserProfile, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllUserProfile()
	}, [getAllUserProfile])
	return (
		<Fragment>
			{loading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary' style={{ color: 'blueviolet' }}>
						Photographers
					</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i>
						Browse and connect with Photographers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No Profiles Found..</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Profiles.propTypes = {
	getAllUserProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { getAllUserProfile })(Profiles)
