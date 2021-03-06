import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile } from '../../actions/profileAction'

const initialState = {
	company: '',
	website: '',
	location: '',
	status: '',
	skills: '',

	bio: '',
	twitter: '',
	facebook: '',
	linkedin: '',
	youtube: '',
	instagram: '',
}

const ProfileForm = ({
	createProfile,

	history,
}) => {
	const [formData, setFormData] = useState(initialState)

	const [displaySocialInputs, toggleSocialInputs] = useState(false)

	const {
		company,
		website,
		location,
		status,
		skills,

		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData

	const onChange = (e) =>
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})

	const onSubmit = (e) => {
		e.preventDefault()

		createProfile(formData, history)
	}

	return (
		<Fragment>
			<h1 className='large text-primary'>Create Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Add some changes to your profile
			</p>
			<small>* = required field</small>
			<form id='createprofile' className='form' onSubmit={onSubmit}>
				<div className='form-group'>
					<select name='status' value={status} onChange={onChange}>
						<option>* Select Professional Status</option>
						<option value='Advertising'>Advertising</option>
						<option value='Corporate'>Corporate</option>
						<option value='Editorial'>Editorial</option>
						<option value='Fashion'>Fashion</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Social Photography'>Social Photography </option>
						<option value='Intern'>Intern</option>
						<option value='Other'>Other</option>
					</select>
					<small className='form-text'>
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className='form-group-profile-edit'>
					<input
						type='text'
						placeholder='Company'
						name='company'
						value={company}
						onChange={onChange}
					/>
					<small className='form-text'>
						Could be your own company or one you work for
					</small>
				</div>
				<div className='form-group-profile-edit'>
					<input
						type='text'
						placeholder='Website'
						name='website'
						value={website}
						onChange={onChange}
					/>
					<small className='form-text'>
						Could be your own or a company website
					</small>
				</div>
				<div className='form-group-profile-edit'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<small className='form-text'>
						City & State suggested (eg. Bangalore, KA)
					</small>
				</div>
				<div className='form-group-profile-edit'>
					<input
						type='text'
						placeholder='* Skills'
						name='skills'
						value={skills}
						onChange={onChange}
					/>
					<small className='form-text'>
						Please use comma separated values (eg. Digital Imaging,ISO
						Speeds,Lenses,Shooting Film)
					</small>
				</div>
				<div className='form-group'>
					<textarea
						placeholder='A short bio of yourself'
						name='bio'
						value={bio}
						rows='5'
						onChange={onChange}
					/>
					<small className='form-text'>Tell us a little about yourself</small>
				</div>
				<div className='my-2'>
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type='button'
						className='btn btn-light'
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x' />
							<input
								type='text'
								placeholder='Twitter URL'
								name='twitter'
								value={twitter}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x' />
							<input
								type='text'
								placeholder='Facebook URL'
								name='facebook'
								value={facebook}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x' />
							<input
								type='text'
								placeholder='YouTube URL'
								name='youtube'
								value={youtube}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x' />
							<input
								type='text'
								placeholder='Linkedin URL'
								name='linkedin'
								value={linkedin}
								onChange={onChange}
							/>
						</div>

						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x' />
							<input
								type='text'
								placeholder='Instagram URL'
								name='instagram'
								value={instagram}
								onChange={onChange}
							/>
						</div>
					</Fragment>
				)}
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

ProfileForm.propTypes = {
	createProfile: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { createProfile })(ProfileForm)
