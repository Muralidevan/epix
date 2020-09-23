import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteExperience } from '../../actions/profileAction'

const Experience = ({ experience, deleteExperience }) => {
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td>
				<Moment format='DD/MM/YYYY'>{moment.utc(exp.from)}</Moment> -{' '}
				{exp.to === null ? (
					' Now'
				) : (
					<Moment format='DD/MM/YYYY'>{moment.utc(exp.to)}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => deleteExperience(exp._id)}
					className='btn btn-danger'
				>
					<i className='fa fa-trash' aria-hidden='true' />
					Delete
				</button>
			</td>
		</tr>
	))

	return (
		<Fragment>
			<h2 className='my-2'>Experience Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th style={{ background: '#c0c0c0', color: '#333' }}>
							<i className='fa fa-building text-primary' aria-hidden='true'></i>
							&nbsp;Company Name
						</th>
						<th
							className='hide-sm'
							style={{ background: '#c0c0c0', color: '#333' }}
						>
							<i
								className='fa fa-briefcase  text-primary'
								aria-hidden='true'
							></i>
							&nbsp;Job Title
						</th>
						<th
							className='hide-sm'
							style={{ background: '#c0c0c0', color: '#333' }}
						>
							<i className='fa fa-clock-o text-primary' aria-hidden='true'></i>
							&nbsp;Duration
						</th>
					</tr>
				</thead>
				<tbody>{experiences}</tbody>
			</table>
		</Fragment>
	)
}

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience)
