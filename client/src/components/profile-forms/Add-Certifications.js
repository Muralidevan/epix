import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addCertification } from '../../actions/profileAction'

const AddCertification = ({ addCertification, history }) => {
	const [formData, setFormData] = useState({
		organization: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	})

	const {
		organization,
		title,
		location,
		from,
		to,
		current,
		description,
	} = formData

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value })

	return (
		<Fragment>
			<h1 className='large text-primary'>Add Your Certifications Details</h1>
			<p className='lead'>
				<i className='fas fa-code-branch' /> Add any Photography Certifications
				that you have acquired
			</p>
			<small>* = required field</small>
			<form
				className='form'
				onSubmit={(e) => {
					e.preventDefault()
					addCertification(formData, history)
				}}
			>
				<div className='form-group-profile'>
					<input
						type='text'
						placeholder='* Course Name'
						name='title'
						value={title}
						onChange={onChange}
						required
					/>
					<small className='form-text'>
						(Fashion Photography,Product Photography)
					</small>
				</div>
				<div className='form-group-profile'>
					<input
						type='text'
						placeholder='* Academy Name'
						name='organization'
						value={organization}
						onChange={onChange}
						required
					/>
					<small className='form-text'>
						(Pixel photography,Prism School Of Photography)
					</small>
				</div>
				<div className='form-group-profile'>
					<input
						type='text'
						placeholder='Location'
						name='location'
						value={location}
						onChange={onChange}
					/>
					<small className='form-text'>Location of your academy</small>
				</div>
				<div className='form-group'>
					<h4>From Date</h4>
					<input type='date' name='from' value={from} onChange={onChange} />
				</div>
				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							checked={current}
							value={current}
							onChange={() => {
								setFormData({ ...formData, current: !current })
							}}
						/>{' '}
						Current
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={onChange}
						disabled={current}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						cols='30'
						rows='5'
						placeholder='Specialization'
						value={description}
						onChange={onChange}
					/>
					<small className='form-text'>Field of Specialization</small>
				</div>
				<input type='submit' className='btn btn-primary my-1' />
				<Link className='btn btn-light my-1' to='/dashboard'>
					Go Back
				</Link>
			</form>
		</Fragment>
	)
}

AddCertification.propTypes = {
	addCertification: PropTypes.func.isRequired,
}

export default connect(null, { addCertification })(AddCertification)
