import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Swal from 'sweetalert2'

import {
	createProfilePic,
	getCurrentProfile,
} from '../../actions/profileAction'

const initialState = {
	profilePic: '',
	preview: '',
	len: '',

	updatedProfilePic: '',
}

const ProfilePic = ({
	createProfilePic,
	profile: { profile, loading },
	getCurrentProfile,
	history,
}) => {
	const [formData, setFormData] = useState(initialState)

	useEffect(() => {
		if (!profile) getCurrentProfile()
		if (!loading && profile) {
			const profileData = { ...initialState }
			for (const key in profile) {
				if (key in profileData) profileData[key] = profile[key]
			}

			setFormData(profileData)
		}
	}, [loading, getCurrentProfile, profile])

	const { profilePic, updatedProfilePic, preview, len } = formData

	// const onChange = (e) =>
	// 	setFormData({ ...formData, [e.target.name]: e.target.value })

	const handleChange = (e) => {
		//console.log(e.target.files, 'event')
		e.preventDefault()

		const file = e.target.files[0]

		const picLen = e.target.files.length

		if (e.target.files && e.target.files[0]) {
			let reader = new FileReader()
			reader.onload = (e) => {
				setFormData({
					len: picLen,
					profilePic: profilePic,
					updatedProfilePic: file,
					preview: URL.createObjectURL(file),
				})
			}
			reader.readAsDataURL(e.target.files[0])
		}
		// console.log(profilePic, 'profilepic')
		// console.log(updatedProfilePic, file, 'updatedprofilepic')
	}
	const handleClick = () => {
		Swal.fire({
			text: 'Please Choose a File To Edit ',
			showConfirmButton: false,
			icon: 'info',
			toast: true,
			timer: 2000,
			position: 'top',
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		let form = new FormData()
		if (len) {
			form.append('profilePic', updatedProfilePic)
		}
		for (const [key, value] of form) {
			console.log('values', key, value)
		}
		// form.append('profilePic', profilePic)

		createProfilePic(form, history, profile ? true : false)
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Edit Your Profile Picture</h1>

			<form className='form' onSubmit={onSubmit} id='form'>
				<div className='form-group'>
					{len ? (
						<Fragment>
							<img
								className='pro-pic  '
								src={preview}
								alt='Please upload'
								id='target-new'
							/>
							<p className='lead'>
								<i className='fas fa-code-branch' />
								New Profile Picture
							</p>
						</Fragment>
					) : profilePic ? (
						<Fragment>
							<img
								className='pro-pic  '
								src={profilePic}
								alt='Add Profile Pic'
								id='target'
							/>
							<p className='lead'>
								<i className='fas fa-code-branch' />
								Current Profile Picture
							</p>
						</Fragment>
					) : (
						<p className='lead'>
							<i className='fas fa-code-branch' />
							Add Your Profile Picture
						</p>
					)}
				</div>
				<div className='form-group'>
					<input
						type='file'
						id='file'
						onChange={handleChange}
						accept='image/*'
						encType='multipart/form-data'
					/>
				</div>

				{len ? (
					<input
						type='submit'
						className='btn btn-primary my-1'
						value='Upload Profile Picture'
					/>
				) : (
					<button
						onClick={handleClick}
						type='button'
						className='btn btn-primary my-1'
					>
						Upload Profile Picture
					</button>
				)}

				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

ProfilePic.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, {
	createProfilePic,
	getCurrentProfile,
})(withRouter(ProfilePic))
