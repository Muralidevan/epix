import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'

const ProfileCertifications = ({
	certifications: {
		title,
		organization,
		location,
		current,
		to,
		from,
		description,
	},
}) => (
	<div>
		<h3 className='text-dark'>{organization}</h3>
		<p>
			<Moment format='YYYY/MM/DD'>{moment.utc(from)}</Moment> -{' '}
			{!to ? ' Now' : <Moment format='YYYY/MM/DD'>{moment.utc(to)}</Moment>}
		</p>
		<p>
			<strong>Title: </strong> {title}
		</p>
		<p>
			<strong>Location: </strong> {location}
		</p>
		<p>
			<strong>Description: </strong> {description}
		</p>
	</div>
)
ProfileCertifications.propTypes = {
	certifications: PropTypes.object.isRequired,
}

export default ProfileCertifications
