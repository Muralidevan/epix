import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import { connect } from 'react-redux'
import { deleteCertification } from '../../actions/profileAction'

const Certification = ({ certification, deleteCertification }) => {
	const certifications = certification.map((cer) => (
		<tr key={cer._id}>
			<td>{cer.organization}</td>
			<td className='hide-sm'>{cer.title}</td>
			<td>
				<Moment format='DD/MM/YYYY'>{moment.utc(cer.from)}</Moment> -{' '}
				{cer.to === null ? (
					' Now'
				) : (
					<Moment format='DD/MM/YYYY'>{moment.utc(cer.to)}</Moment>
				)}
			</td>
			<td>
				<button
					onClick={() => deleteCertification(cer._id)}
					className='btn btn-danger'
				>
					Delete
				</button>
			</td>
		</tr>
	))

	return (
		<Fragment>
			<h2 className='my-2'>Certification Credentials</h2>
			<table className='table'>
				<thead>
					<tr>
						<th>Academy Name</th>
						<th className='hide-sm'>Course Name</th>
						<th className='hide-sm'>Duration</th>
					</tr>
				</thead>
				<tbody>{certifications}</tbody>
			</table>
		</Fragment>
	)
}

Certification.propTypes = {
	Certification: PropTypes.array.isRequired,
	deleteCertification: PropTypes.func.isRequired,
}

export default connect(null, { deleteCertification })(Certification)
