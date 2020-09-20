import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import userReducer from '../reducers/userReducer'
import alertReducer from '../reducers/alertReducer'
import profileReducer from '../reducers/profileReducer'
import postReducer from '../reducers/postReducer'

const middleware = [thunk]

const configureStore = () => {
	const store = createStore(
		combineReducers({
			user: userReducer,
			alert: alertReducer,
			profile: profileReducer,
			post: postReducer,
		}),
		composeWithDevTools(applyMiddleware(...middleware))
	)
	return store
}

export default configureStore
