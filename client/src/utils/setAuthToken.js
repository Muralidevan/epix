// //import api from './api'
// import axios from 'axios'
// import store from '../store/configureStore'

// const api = axios.create({
// 	baseURL: '/api',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })

// // api.interceptors.response.use(function (config) {
// // 	const token = localStorage.getItem('authToken')
// // 	config.headers.Authorization = token

// // 	return config
// // })

// const setAuthToken = (token) => {
// 	//const token = localStorage.getItem('authToken')

// 	if (token) {
// 		api.defaults.headers.common['Authorization'] = `${token}`
// 		console.log(api.defaults.headers, 'defaul header')
// 		localStorage.setItem('authToken', token)
// 	} else {
// 		delete api.defaults.headers.common['Authorization']
// 		localStorage.removeItem('authToken')
// 	}
// }

// export default setAuthToken
