import axios from '../Config/axios'
import { setAlert } from './alertAction'
import Swal from 'sweetalert2'

export const getAllPosts = (post) => {
	return { type: 'GET_POSTS', payload: post }
}
export const getsinglePost = (post) => {
	return { type: 'GET_POST', payload: post }
}
export const UPDATE_LIKES = 'UPDATE_LIKES'

export const upDateLikes = (id, likes) => {
	return { type: 'UPDATE_LIKES', payload: { id, likes } }
}

export const deletePost = (id) => {
	return { type: 'DELETE_POST', payload: id }
}
export const AddPost = (formdata) => {
	return { type: 'ADD_POST', payload: formdata }
}
export const AddComment = (formdata) => {
	return { type: 'ADD_COMMENT', payload: formdata }
}
export const RemoveComment = (commentId) => {
	return { type: 'REMOVE_COMMENT', payload: commentId }
}
//GET POSTS
export const getPosts = () => {
	return (dispatch) => {
		try {
			axios
				.get('/posts', {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const post = response.data
					dispatch(getAllPosts(post))
				})
				.catch((err) => {
					if (err) {
						dispatch(setAlert('err', 'danger'))
					}
				})
		} catch (err) {
			console.log(err)
		}
	}
}

//get a Post

export const startGetPost = (id) => {
	return (dispatch) => {
		try {
			axios
				.get(`/posts/${id}`, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const post = response.data
					dispatch(getsinglePost(post))
				})
				.catch((err) => {
					if (err) {
						dispatch(setAlert('Not Found', 'danger'))
					}
				})
		} catch (err) {
			console.log(err)
		}
	}
}

// //aDD LIKE
export const addLike = (id) => {
	return (dispatch) => {
		try {
			axios
				.put(
					`/posts/likes/${id}`,
					{},
					{
						headers: {
							Authorization: localStorage.getItem('authToken'),
						},
					}
				)
				.then((response) => {
					const likes = response.data
					//console.log(likes)
					dispatch(upDateLikes(id, likes))
					if (response.data.msg) {
						Swal.fire({
							text: 'Post Has Already been liked!',
							showConfirmButton: false,
							icon: 'warning',
							toast: true,
							timer: 2000,
							position: 'top',
						})
					}
				})
				.catch((err) => {
					const errors = err.response.data.errors

					console.log(errors)
				})
		} catch (err) {
			console.log(err)
		}
	}
}
//remove LIKE
export const removeLike = (id) => {
	return (dispatch) => {
		try {
			axios
				.put(
					`/posts/unlikes/${id}`,
					{},
					{
						headers: {
							Authorization: localStorage.getItem('authToken'),
						},
					}
				)
				.then((response) => {
					//console.log(response.data)
					const likes = response.data
					dispatch(upDateLikes(id, likes))
					if (response.data.msg) {
						Swal.fire({
							text: 'Post Has Not yet been liked!',
							showConfirmButton: false,
							icon: 'warning',
							toast: true,
							timer: 2000,
							position: 'top',
						})
					}
				})
				.catch((res) => {
					console.log(res.data)
				})
		} catch (err) {
			console.log(err)
		}
	}
}

//delete Post
export const startDeletePosts = (id) => {
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
				denyButtonText: '<i class="fa fa-thumbs-down"> Cancel </i>',
				denyButtonAriaLabel: 'Thumbs down',
			}).then((result) => {
				if (result.isConfirmed) {
					axios
						.delete(`posts/${id}`, {
							headers: {
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then(() => {
							dispatch(deletePost(id))
							Swal.fire({
								text: 'Post Removed Successfully!',
								showConfirmButton: false,
								icon: 'error',
								toast: true,
								timer: 2000,
								position: 'top',
							})
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

//Add post
export const startAddPost = (form) => {
	return (dispatch) => {
		try {
			axios
				.post('/posts', form, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const post = response.data
					dispatch(AddPost(post))
					Swal.fire({
						text: 'Post Added Successfully',
						showConfirmButton: false,
						icon: 'success',
						toast: true,
						timer: 2000,
						position: 'top',
					})
				})
				.catch((err) => {
					console.log(err)
				})
		} catch (err) {
			console.log(err)
		}
	}
}

//ADD COMMENT
export const startAddComment = (postId, formdata) => {
	return (dispatch) => {
		try {
			axios
				.post(`/posts/comment/${postId}`, formdata, {
					headers: {
						'Content-type': 'application/json',
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const comment = response.data
					dispatch(AddComment(comment))
					Swal.fire({
						text: 'Comment Added',
						showConfirmButton: false,
						icon: 'success',
						toast: true,
						timer: 2000,
						position: 'top',
					})
				})
				.catch((err) => {
					console.log(err)
				})
		} catch (err) {
			console.log(err)
		}
	}
}
//REMOVE COMMENT
export const startRemoveComment = (postId, commentId) => {
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
						.delete(`/posts/comment/${postId}/${commentId}`, {
							headers: {
								'Content-type': 'application/json',
								Authorization: localStorage.getItem('authToken'),
							},
						})
						.then((response) => {
							//const comment = response.data
							dispatch(RemoveComment(commentId))
							console.log('comment removed')
							Swal.fire({
								text: 'Comment Removed',
								showConfirmButton: false,
								icon: 'success',
								toast: true,
								timer: 2000,
								position: 'top',
							})
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
