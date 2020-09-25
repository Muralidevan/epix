import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startAddComment } from '../../actions/postAction'

const CommentForm = ({ postId, startAddComment }) => {
	const [text, setText] = useState('')

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault()
					startAddComment(postId, { text })
					setText('')
				}}
			>
				<textarea
					name='text'
					cols='30'
					rows='3'
					placeholder='Comment  on the post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
					style={{ width: '61%' }}
				/>

				<input
					type='submit'
					className='btn btn-dark my-1'
					style={{ margin: '0,1rem', display: 'block' }}
					value='Comment'
				/>
			</form>
		</div>
	)
}

CommentForm.propTypes = {
	startAddComment: PropTypes.func.isRequired,
}

export default connect(null, { startAddComment })(CommentForm)
