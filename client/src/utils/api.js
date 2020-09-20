import axios from 'axios'
import store from '../store/configureStore'
//import { startUserLogout } from '../actions/userAction'

const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
})

// Add a request interceptor
api.interceptors.request.use(function (config) {
	const token = localStorage.getItem('authToken')
	config.headers.Authorization = token

	return config
})
/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
**/

// api.interceptors.response.use(
// 	(res) => res,
// 	(err) => {
// 		if (err.response.status === 401) {
// 			store.dispatch(startUserLogout())
// 		}
// 		return Promise.reject(err)
// 	}
// )

export default api
