//profile-all user profile,profiles-profile listing page
const profileInitialState = {
	profile: null,
	profiles: [],
	error: {},
	loading: true,
}
const profileReducer = (state = profileInitialState, action) => {
	const { type, payload } = action
	switch (type) {
		case 'GET_PROFILE':
		case 'UPDATE_PROFILE': {
			return {
				...state,
				profile: payload,
				loading: false,
			}
		}
		case 'GET_PROFILES': {
			return {
				...state,
				profiles: payload,
				loading: false,
			}
		}

		case 'PROFILE_ERROR': {
			return {
				...state,
				error: payload,
				loading: false,
			}
		}
		case 'CLEAR_PROFILE': {
			return {
				...state,
				profile: null,
				loading: false,
			}
		}

		default: {
			return {
				...state,
			}
		}
	}
}

export default profileReducer
