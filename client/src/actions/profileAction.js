import axios from '../Config/axios'
import { setAlert } from './alertAction'
import Swal from 'sweetalert2'

export const getProfile = (profile) => {
	return { type: 'GET_PROFILE', payload: profile }
}
export const getAllProfiles = (profile) => {
	return { type: 'GET_PROFILES', payload: profile }
}
export const clearProfile = () => {
	return { type: 'CLEAR_PROFILE' }
}
//for certfications and experience
export const updateProfile = (profile) => {
	return { type: 'UPDATE_PROFILE', payload: profile }
}

export const deleteAccount = (profile) => {
	return { type: 'ACCOUNT_DELETED', payload: profile }
}

//get current users profile
export const getCurrentProfile = () => {
	return (dispatch) => {
		try {
			axios
				.get('/profile/me', {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(getProfile(profile))
				})
		} catch (err) {
			dispatch({
				type: 'PROFILE_ERROR',
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}
//get all profiles
export const getAllUserProfile = () => {
	return (dispatch) => {
		dispatch(clearProfile())
		try {
			axios
				.get('/profile', {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(getAllProfiles(profile))
				})
		} catch (err) {
			dispatch({
				type: 'PROFILE_ERROR',
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}

//get profile by id
export const getProfileById = (userId) => {
	return (dispatch) => {
		try {
			axios
				.get(`/profile/${userId}`, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(getProfile(profile))
				})
		} catch (err) {
			dispatch({
				type: 'PROFILE_ERROR',
				payload: { msg: err.response.statusText, status: err.response.status },
			})
		}
	}
}

//create or update profile
export const createProfile = (form, history, edit = false) => {
	return (dispatch) => {
		try {
			axios
				.post('/profile', form, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(getProfile(profile))
					edit
						? Swal.fire({
								text: 'Profile Updated',
								showConfirmButton: false,
								icon: 'success',
								toast: true,
								timer: 2000,
								position: 'top',
						  })
						: Swal.fire({
								text: 'Profile Created',
								showConfirmButton: false,
								icon: 'success',
								toast: true,
								timer: 2000,
								position: 'top',
						  })

					if (!edit) {
						history.push('/profile-picture')
					}
				})
				.catch((err) => {
					const errors = err.response.data.errors

					if (errors) {
						errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
					}
					// dispatch({
					// 	type: 'PROFILE_ERROR',
					// 	payload: {
					// 		msg: err.response.statusText,
					// 		status: err.response.status,
					// 	},
					// })
				})
		} catch (err) {
			console.log(err)
		}
	}
}
export const createProfilePic = (form, history, edit = false) => {
	return (dispatch) => {
		try {
			axios
				.post('/profilepic', form, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(getProfile(profile))
					edit
						? Swal.fire({
								text: 'Profile Picture Updated',
								showConfirmButton: false,
								icon: 'success',
								toast: true,
								timer: 2000,
								position: 'top',
						  })
						: Swal.fire({
								text: 'Profile Picture Created',
								showConfirmButton: false,
								icon: 'success',
								toast: true,
								timer: 2000,
								position: 'top',
						  })

					if (edit) {
						history.push('/dashboard')
					}
				})
				.catch((err) => {
					const errors = err.response.data.errors

					if (errors) {
						errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
					}
					// dispatch({
					// 	type: 'PROFILE_ERROR',
					// 	payload: {
					// 		msg: err.response.statusText,
					// 		status: err.response.status,
					// 	},
					// })
				})
		} catch (err) {
			console.log(err)
		}
	}
}

export const clearAllProfile = () => {
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_PROFILE',
		})
	}
}

//Add Experience
export const addExperience = (formData, history) => {
	return (dispatch) => {
		try {
			axios
				.put('/profile/experience', formData, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(updateProfile(profile))
					Swal.fire({
						text: 'Experience Added',
						showConfirmButton: false,
						icon: 'success',
						toast: true,
						timer: 2000,
						position: 'top',
					})

					history.push('/dashboard')
				})
				.catch((err) => {
					const errors = err.response.data.errors

					if (errors) {
						errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
					}
				})
		} catch (err) {
			console.log(err)
		}
	}
}
//Add Certifications
export const addCertification = (formData, history) => {
	return (dispatch) => {
		try {
			axios
				.put('/profile/certifications', formData, {
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const profile = response.data
					dispatch(updateProfile(profile))
					Swal.fire({
						text: 'Certifications Added',
						showConfirmButton: false,
						icon: 'success',
						toast: true,
						timer: 2000,
						position: 'top',
					})

					history.push('/dashboard')
				})
				.catch((err) => {
					const errors = err.response.data.errors

					if (errors) {
						errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
					}
				})
		} catch (err) {
			console.log(err)
		}
	}
}

//Delete experience
export const deleteExperience = (id) => {
	return (dispatch) => {
		try {
			Swal.fire({
				title: 'Are Your Sure?',
				icon: 'warning',
				text: "You won't be able to revert this!",
				showDenyButton: true,

				focusConfirm: false,
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes, delete it!',
				confirmButtonAriaLabel: 'Thumbs up, great!',
				denyButtonText: '<i class="fa fa-thumbs-down"> Cancel</i>',
				denyButtonAriaLabel: 'Thumbs down',
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete(`/profile/experience/${id}`, {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then((response) => {
							const profile = response.data
							dispatch(updateProfile(profile))
							Swal.fire({
								text: 'Certifications Removed',
								showConfirmButton: false,
								icon: 'error',
								toast: true,
								timer: 2000,
								position: 'top',
							})

							//dispatch(setAlert('Experience Removed', 'success'))

							//	history.push('/dashboard')
						})
						.catch((err) => {
							const errors = err.response.data.errors

							if (errors) {
								errors.forEach((error) =>
									dispatch(setAlert(error.msg, 'danger'))
								)
							}
						})
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
}

//Delete certification
export const deleteCertification = (id) => {
	return (dispatch) => {
		try {
			Swal.fire({
				title: 'Are Your Sure?',
				icon: 'warning',
				text: "You won't be able to revert this!",
				showDenyButton: true,

				focusConfirm: false,
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes ,delete it',
				confirmButtonAriaLabel: 'Thumbs up, great!',
				denyButtonText: '<i class="fa fa-thumbs-down"> Cancel</i>',
				denyButtonAriaLabel: 'Thumbs down',
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete(`/profile/certifications/${id}`, {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then((response) => {
							const profile = response.data
							dispatch(updateProfile(profile))
							Swal.fire({
								text: 'Certifications Removed',
								showConfirmButton: false,
								icon: 'error',
								toast: true,
								timer: 2000,
								position: 'top',
							})

							//	dispatch(setAlert('Certification Removed', 'success'))

							//history.push('/dashboard')
						})
						.catch((err) => {
							const errors = err.response.data.errors

							if (errors) {
								errors.forEach((error) =>
									dispatch(setAlert(error.msg, 'danger'))
								)
							}
						})
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
}
//Delete account and profile
export const deleteUserAccount = () => {
	return (dispatch) => {
		try {
			Swal.fire({
				title: 'Are Your Sure?',
				icon: 'warning',
				text: "You won't be able to revert this!",
				showDenyButton: true,

				focusConfirm: false,
				confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes, delete it!',
				confirmButtonAriaLabel: 'Thumbs up, great!',
				denyButtonText: '<i class="fa fa-thumbs-down"> Cancel</i>',
				denyButtonAriaLabel: 'Thumbs down',
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete('/profile', {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then(() => {
							dispatch(clearAllProfile())
							dispatch(deleteAccount())
							Swal.fire({
								text: 'Your Account Has Been Deleted Permanently',
								showConfirmButton: false,
								icon: 'error',
								toast: true,
								timer: 2000,
								position: 'top',
							})

							window.location.href = '/'
						})
						.catch((err) => {
							console.log(err)
						})
				}
			})
		} catch (err) {
			console.log(err)
		}
	}
}
