import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import avatar from '../../../src/img/avatar.jpg'

const ProfileItem = ({
	profile: { user, status, company, location, skills, profilePic },
}) => {
	if (user) {
		return (
			<div className='profile bg-light'>
				{user ? (
					<Fragment>
						{profilePic ? (
							<img src={profilePic} alt='' className='round-img-2' />
						) : (
							<img src={avatar} alt='' className='round-img-2' />
						)}
						<div>
							{user ? <h2>{user.username}</h2> : ''}

							<p>
								{status}
								{company && <span> at {company}</span>}
							</p>

							<p className='my-2'>{location && <span> at {location}</span>}</p>

							{user ? (
								<Link
									to={`/profile/${user._id}`}
									className='btn btn-primary'
									style={{ fontSize: '1.0rem', backgroundColor: 'blueviolet' }}
								>
									View Profile
								</Link>
							) : (
								''
							)}
						</div>
						<ul>
							{skills.slice(0, 4).map((skill, index) => (
								<strong>
									<li
										key={index}
										className='text-primary'
										style={{ fontSize: '1.0rem', color: 'blueviolet' }}
									>
										<i className='fas fa-check' /> {skill}
									</li>
								</strong>
							))}
						</ul>
					</Fragment>
				) : (
					''
				)}
			</div>
		)
	} else {
		return null
	}
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
}

export default ProfileItem
