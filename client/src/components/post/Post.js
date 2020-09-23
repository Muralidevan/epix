import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import PostItem from '../posts/PostItem'
import CommentForm from '../post/CommentForm'
import CommentItem from '../post/CommentItem'
import { startGetPost } from '../../actions/postAction'

const Post = ({ startGetPost, post: { post, loading }, match }) => {
	useEffect(() => {
		startGetPost(match.params.id)
	}, [startGetPost, match.params.id])

	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to='/posts' className='btn btn-light'>
				Back To Posts
			</Link>
			<PostItem post={post} showActions={false} />
			<CommentForm postId={post._id} />
			<div className='comments'>
				{post.comments.map((comment) => (
					<CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
		</Fragment>
	)
}

Post.propTypes = {
	startGetPost: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { startGetPost })(Post)
