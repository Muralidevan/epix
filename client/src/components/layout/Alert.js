import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = (props) => {
	return (
		props.alerts !== null &&
		props.alerts.length > 0 &&
		props.alerts.map((alert) => (
			//alert alert-danger
			<div key={alert.id} className={`alert alert-${alert.alertType}`}>
				{alert.msg}
			</div>
		))
	)
}

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
}

//to get the state from alert array -from reducer
const mapStateToProps = (state) => ({
	//from store
	alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
