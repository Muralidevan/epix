import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileCertifications from './ProfileCertifications'
// import ProfileGithub from './ProfileGithub'
import { getProfileById } from '../../actions/profileAction'

const Profile = ({ getProfileById, profile: { profile }, user, match }) => {
	useEffect(() => {
		getProfileById(match.params.id) //props.match.params.id
	}, [getProfileById, match.params.id])

	return (
		<Fragment>
			{profile === null ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>
					{user.isAuthenticated && (
						<Link to='/edit-profile' className='btn btn-dark'>
							Edit Profile
						</Link>
					)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experience</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((experience) => (
										<ProfileExperience
											key={experience._id}
											experience={experience}
										/>
									))}
								</Fragment>
							) : (
								<h4>No Experience Credentials</h4>
							)}
						</div>

						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Certifications</h2>
							{profile.certifications.length > 0 ? (
								<Fragment>
									{profile.certifications.map((certifications) => (
										<ProfileCertifications
											key={certifications._id}
											certifications={certifications}
										/>
									))}
								</Fragment>
							) : (
								<h4>No Certification Credentials</h4>
							)}
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	)
}

Profile.propTypes = {
	getProfileById: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
	user: state.user,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
