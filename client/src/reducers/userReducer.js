//reducer decides what to do with state and sends it to any component which needs it(state)
const userInitialState = {
	isAuthenticated: false,
	loading: true,
}
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
		case 'ACCOUNT_DELETED': {
			localStorage.removeItem('authToken')
			return {
				...state,
				user: null,
				profile: null,
				isAuthenticated: false,
				loading: false,
			}
		}
		case 'LOGOUT':
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
			}

		default: {
			return {
				...state,
			}
		}
	}
}

export default userReducer
