import axios from '../Config/axios'
import { setAlert } from './alertAction'

export const setUser = (user) => {
	return { type: 'SET_USER', payload: user }
}

export const startLoginUser = (formData) => {
	return (dispatch) => {
		axios
			.post('/users/login', formData)
			.then((response) => {
				if (response.data.hasOwnProperty('errors')) {
					//alert(response.data.error)
					dispatch(setAlert('invalid username orpassword', 'danger'))
				} else {
					dispatch(setAlert('Login Sucessfull', 'success'))
					localStorage.setItem('authToken', response.data.token)

					// Promise.all()
					//startGetUser()
					axios
						.get('/users/account', {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then((response) => {
							const user = response.data

							dispatch(setUser(user))
							//redirect()
						})
						.catch((err) => {
							alert(err)
						})
				}
			})
			.catch((err) => {
				console.log(err)
			})
	}
}

export const startGetUser = () => {
	return (dispatch) => {
		axios
			.get('/users/account', {
				headers: {
					Authorization: localStorage.getItem('authToken'),
				},
			})
			.then((response) => {
				const user = response.data
				//console.log(user)
				dispatch(setUser(user))
			})
			.catch((err) => {
				alert(err)
			})
	}
}

export const startRegisterUser = (formData, redirect) => {
	return (dispatch) => {
		try {
			axios
				.post('/users/register', formData, {})
				.then((response) => {
					if (response.data.hasOwnProperty('errors')) {
						const errors = response.data.errors

						if (errors) {
							dispatch(setAlert(errors, 'danger'))
						}
					} else {
						// alert('you have registered successfully')
						const success = 'you have registered successfully'
						dispatch(setAlert(success, 'success'))
						startGetUser()
						redirect()
					}
				})
				.catch((err) => {
					console.log(err)
				})
		} catch (err) {
			const errors = err.response.data.errors

			if (errors) {
				errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')))
			}
		}
	}
}

export const startUserLogout = () => {
	return (dispatch) => {
		axios
			.delete('/users/logout', {
				headers: {
					'x-auth': localStorage.getItem('authToken'),
				},
			})
			.then((response) => {
				if (response.data.notice) {
					alert(response.data.notice)
					localStorage.removeItem('authToken')
					dispatch(setUser({}))
					window.location.href = '/'
				}
			})
	}
}
