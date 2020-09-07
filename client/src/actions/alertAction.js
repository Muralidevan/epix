import { v4 as uuidv4 } from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from '../reducers/alertReducer'

export const setAlert = (msg, alertType) => {
	//thunk
	return (dispatch) => {
		const id = uuidv4()
		dispatch({
			type: SET_ALERT,
			payload: [msg, alertType, id],
		})
		//to dispatch remove alert array after 5secs
		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), 3000)
	}
}
