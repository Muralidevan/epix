import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = ({
	profile: {
		user: { _id, username },
		status,
		company,
		location,
		skills,
	},
}) => {
	return (
		<div className='profile bg-light'>
			<img src='{avatar}' alt='' className='round-img' />
			<div>
				<h2>{username}</h2>
				<p>
					{status}
					{company && <span> at {company}</span>}
				</p>
				<p>
					<p className='my-1' style={{ textAlignLast: 'left' }}>
						{location && <span> at {location}</span>}
					</p>
				</p>
				<Link to={`/profile/${_id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className='text-primary'>
						<i className='fas fa-check' /> {skill}
					</li>
				))}
			</ul>
		</div>
	)
}

ProfileItem.propTypes = {
	profile: PropTypes.object.isRequired,
}

export default ProfileItem
