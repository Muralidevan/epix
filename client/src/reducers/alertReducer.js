export const SET_ALERT = 'SET_ALERT'
export const REMOVE_ALERT = 'REMOVE_ALERT'

const alertInitialState = []

const alertReducer = (state = alertInitialState, action) => {
	//action.type,action.payload
	const { type, payload } = action

	switch (type) {
		case 'SET_ALERT':
			//state is immutable
			return [...state, payload]
		case 'REMOVE_ALERT':
			//to remove specific alert using id-removes all alerts expect which matches id
			return state.filter((alert) => alert.id !== payload)
		default: {
			return state
		}
	}
}

export default alertReducer
