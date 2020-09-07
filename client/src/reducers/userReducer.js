//reducer decides what to do with state and sends it to any component which needs it(state)
const userInitialState = { isAuthenticated: false, loading: true, user: null }
const userReducer = (state = userInitialState, action) => {
	const { type, payload } = action
	switch (type) {
		case 'SET_USER': {
			return {
				...state,
				user: payload,
				isAuthenticated: true,
				loading: false,
			}
		}
		default: {
			return state
		}
	}
}

export default userReducer
