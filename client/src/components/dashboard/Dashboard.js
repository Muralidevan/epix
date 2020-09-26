import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	getCurrentProfile,
	deleteUserAccount,
} from '../../actions/profileAction'
// import { startGetUser } from '../../actions/userAction'
import DashBoardAction from './DashboardAction'
import Experience from './Experience'
import Certification from './Certification'

const Dashboard = ({
	getCurrentProfile,
	deleteUserAccount,
	user: { user },
	profile: { profile },
}) => {
	useEffect(() => {
		//startGetUser()

		getCurrentProfile()
	}, [getCurrentProfile])
	return (
		<Fragment>
			<h1 className='large text-primary'>Profile Section</h1>
			<p className='lead'>
				<i className='fas fa-user'>Welcome {user && user.username}</i>
			</p>
			{profile !== null ? (
				<Fragment>
					<DashBoardAction /> <Experience experience={profile.experience} />
					<Certification certification={profile.certifications} />
					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => {
								deleteUserAccount()
							}}
							style={{ margin: 0, display: 'block' }}
						>
							<i className='fa fa-trash' aria-hidden='true' />
							Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					{' '}
					<p>You have not yet setup a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	)
}

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteUserAccount: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	user: state.user,
	profile: state.profile,
})
export default connect(mapStateToProps, {
	getCurrentProfile,
	deleteUserAccount,
})(Dashboard)
