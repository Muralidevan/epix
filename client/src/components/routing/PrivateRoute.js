import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'

//Operation 1: Find the component property defined on props and
//assign it to a new location in state we call Component (Note: capital Component).
//Operation 2: Then, take all remaining properties defined on the props object and collect them inside an argument called rest.
const PrivateRoute = ({
	component: Component,
	user: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={(props) =>
			loading ? (
				<Spinner />
			) : isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect to='/login' />
			)
		}
	/>
)

PrivateRoute.propTypes = {
	user: PropTypes.object.isRequired,
}

const mapStatetoProps = (state) => ({
	user: state.user,
})

export default connect(mapStatetoProps)(PrivateRoute)
