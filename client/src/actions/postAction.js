import axios from '../Config/axios'
import { setAlert } from './alertAction'

export const getAllPosts = (post) => {
	return { type: 'GET_POSTS', payload: post }
}
export const getsinglePost = (post) => {
	return { type: 'GET_POST', payload: post }
}

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

//aDD LIKE
export const addLike = (id) => {
	return (dispatch) => {
		try {
			axios
				.put(`/posts/likes/${id}`, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const likes = response.data
					//console.log(likes)
					dispatch(upDateLikes())
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
				.put(`/posts/unlikes/${id}`, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					const likes = response.data
					dispatch(upDateLikes(id, likes))
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

//delete Post
export const startDeletePosts = (id) => {
	return (dispatch) => {
		try {
			axios
				.delete(`posts/${id}`, {
					headers: {
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then(() => {
					dispatch(deletePost(id))
					dispatch(setAlert('Post Removed', 'success'))
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
					dispatch(setAlert('Post Created', 'success'))
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
					dispatch(setAlert('Comment Added', 'success'))
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
//REMOVE COMMENT
export const startRemoveComment = (postId, commentId) => {
	return (dispatch) => {
		try {
			axios
				.delete(`/posts/comment/${postId}/${commentId}`, {
					headers: {
						'Content-type': 'application/json',
						Authorization: localStorage.getItem('authToken'),
					},
				})
				.then((response) => {
					if (response.data.hasOwnProperty('errors')) {
						const errors = response.data.errors
						//console.log(errors)
						if (errors) {
							dispatch(setAlert(errors, 'danger'))
						} else {
							//const ceomment = response.data
							dispatch(RemoveComment(commentId))
							dispatch(setAlert('Comment Removed', 'success'))
						}
					}
				})
				.catch((err) => {
					console.log(err)
				})
		} catch (err) {
			console.log(err)
		}
	}
}
