import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
	return (
		<div className='dash-buttons'>
			<Link to='/profile-picture' className='btn btn-light'>
				<i className='fas fa-user-circle text-primary' /> Add/Edit Profile
				Picture
			</Link>
			<Link to='/edit-profile' className='btn btn-light'>
				<i className='fas fa-user-circle text-primary' /> Edit Profile
			</Link>
			<Link to='/add-experience' className='btn btn-light'>
				<i className='fab fa-black-tie text-primary' /> Add Experience
			</Link>
			<Link to='/add-certification' className='btn btn-light'>
				<i className='fas fa-graduation-cap text-primary' /> Add Certification
			</Link>
		</div>
	)
}

export default DashboardActions
