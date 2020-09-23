import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { startRemoveComment } from '../../actions/postAction'

const CommentItem = ({
	postId,
	comment: { _id, text, profilePic, user, username, date },
	users,
	startRemoveComment,
}) => (
	<div className='post bg-white p-1 my-1'>
		<div className='post-group'>
			<Link to={`/profile/${user}`}>
				<img className='round-img' src={profilePic} alt='' />
				<h4>{username}</h4>
			</Link>
			<div className='post-group-2'>
				<p className='my-1'>{text}</p>
				<p className='post-date'>
					Posted on <Moment format='LLL'>{date}</Moment>
				</p>
				{!users.loading && user === users.user._id && (
					<button
						onClick={() => startRemoveComment(postId, _id)}
						type='button'
						className='btn btn-primary'
						style={{ background: '#dc3545' }}
					>
						<i className='fa fa-trash' aria-hidden='true' />
						Remove Comment
					</button>
				)}
			</div>
		</div>
	</div>
)

CommentItem.propTypes = {
	postId: PropTypes.string.isRequired,
	comment: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired,
	startRemoveComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	users: state.user,
})

export default connect(mapStateToProps, { startRemoveComment })(CommentItem)
