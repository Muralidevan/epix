import axios from '../Config/axios'
import { setAlert } from './alertAction'
import Swal from 'sweetalert2'
import { clearProfile } from '../actions/profileAction'

export const setUser = (user) => {
	return { type: 'SET_USER', payload: user }
}

export const logOut = () => {
	return { type: 'LOG_OUT' }
}

export const startLoginUser = (formData, redirect) => {
	return (dispatch) => {
		axios
			.post('/users/login', formData)
			.then((response) => {
				if (response.data.hasOwnProperty('errors')) {
					//alert(response.data.error)
					dispatch(setAlert('Invalid Username or Password', 'danger'))
				} else {
					const Toast = Swal.mixin({
						toast: true,
						position: 'top',
						showConfirmButton: false,
						timer: 2000,
						timerProgressBar: true,
						onOpen: (toast) => {
							toast.addEventListener('mouseenter', Swal.stopTimer)
							toast.addEventListener('mouseleave', Swal.resumeTimer)
						},
					})

					Toast.fire({
						icon: 'success',
						title: 'Signed In Successfully',
					})
					//dispatch(setAlert('Login Sucessfull', 'success'))
					localStorage.setItem('authToken', response.data.token)

					axios
						.get('/users/account', {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then((response) => {
							const user = response.data

							dispatch(setUser(user))
							redirect()
						})
						.catch((err) => {
							console.log(err)
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
				console.log(err)
				if (err) {
					window.location.reload()
				}
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
						//console.log(errors)
						if (errors) {
							dispatch(setAlert(errors, 'danger'))
						}
					} else {
						const Toast = Swal.mixin({
							toast: true,
							position: 'top',
							showConfirmButton: false,
							timer: 2000,
							timerProgressBar: true,
							onOpen: (toast) => {
								toast.addEventListener('mouseenter', Swal.stopTimer)
								toast.addEventListener('mouseleave', Swal.resumeTimer)
							},
						})

						Toast.fire({
							icon: 'info',
							title: 'You Have Registered Successfully',
						})
						// const success = 'you have registered successfully'
						// dispatch(setAlert(success, 'success'))
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
		localStorage.removeItem('authToken')
		dispatch(clearProfile())
		dispatch(setUser({}))

		dispatch(logOut())
		const Toast = Swal.mixin({
			toast: true,
			position: 'top',
			showConfirmButton: false,
			timer: 5000,

			onOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			},
		})

		Toast.fire({
			icon: 'success',
			title: 'Signed Out Successfully',
		})

		window.location.href = '/'
	}
}
