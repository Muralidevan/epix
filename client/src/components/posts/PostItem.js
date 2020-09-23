import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, startDeletePosts } from '../../actions/postAction'
import avatar from '../../../src/img/avatar.jpg'

const PostItem = ({
	addLike,
	removeLike,
	startDeletePosts,
	users,

	post: {
		_id,
		text,
		username,
		user,
		likes,
		comments,
		date,
		profilePic,
		iso,
		apperture,
		shutterspeed,
		imgsrc,
	},

	showActions,
}) => {
	//console.log(profilePic)
	return (
		<div className='post bg-white p-1 my-1'>
			<div className='post-group'>
				<Link to={`/profile/${user}`}>
					{profilePic ? (
						<img className='round-img' src={profilePic} alt='' />
					) : (
						<img src={avatar} alt='' className='round-img' />
					)}
				</Link>

				<div className='post-group-2'>
					<h4 style={{ textAlignLast: 'left' }}>{username}</h4>
					<p className='post-date'>
						<Moment format='LLL'>{date}</Moment>
					</p>
				</div>
			</div>
			<div className='post-group-2'>
				{text ? (
					<p className='my-1' style={{ textAlign: 'left', fontSize: '1.2rem' }}>
						{text === 'undefined' ? '' : text}
					</p>
				) : (
					''
				)}

				<img src={imgsrc} alt='' style={{ width: '100%', height: '700px' }} />

				{showActions && (
					<Fragment>
						<div className='post-group' style={{ width: 'auto' }}>
							<div className='post-group-2' style={{ width: '50%' }}>
								<p
									className='my-1'
									style={{
										textAlign: 'left',
										fontSize: '1.8rem',
										color: 'blueviolet',
										wordSpacing: '1cm',
									}}
								>
									<i className='fa fa-info-circle' aria-hidden='true'>
										Iso-{iso === 'undefined' ? 'auto' : iso}
									</i>
								</p>
							</div>
							<div className='post-group-2' style={{ width: '50%' }}>
								<p
									className='my-1'
									style={{
										textAlignLast: 'left',
										fontSize: '1.8rem',
										color: 'blueviolet',
									}}
								>
									<i className='fa fa-info-circle' aria-hidden='true'>
										Apperture-{apperture === 'undefined' ? 'auto' : apperture}
									</i>
								</p>
							</div>
							<div className='post-group-2' style={{ width: '50%' }}>
								<p
									className='my-1'
									style={{
										textAlignLast: 'left',
										fontSize: '1.8rem',
										color: 'blueviolet',
									}}
								>
									<i className='fa fa-info-circle' aria-hidden='true'>
										ShutterSpeed-
										{shutterspeed === 'undefined' ? 'auto' : shutterspeed}
									</i>
								</p>
							</div>
						</div>

						<button
							onClick={() => addLike(_id)}
							type='button'
							className='btn btn-light'
						>
							<i className='fas fa-thumbs-up' />{' '}
							<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
						</button>
						<button
							onClick={() => removeLike(_id)}
							type='button'
							className='btn btn-light'
						>
							<i className='fas fa-thumbs-down' />
						</button>
						<Link to={`/posts/${_id}`} className='btn btn-primary'>
							Comments{' '}
							{comments.length > 0 && (
								<span className='comment-count'>{comments.length}</span>
							)}
						</Link>

						{!users.loading && user === users.user._id && (
							<button
								onClick={() => startDeletePosts(_id)}
								type='button'
								className='btn  btn-primary'
								style={{ background: '#dc3545' }}
							>
								<i className='fa fa-trash' aria-hidden='true' />
								Remove Post
							</button>
						)}
					</Fragment>
				)}
			</div>
		</div>
	)
}

PostItem.defaultProps = {
	showActions: true,
}

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	users: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	startDeletePosts: PropTypes.func.isRequired,
	showActions: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	users: state.user,
	profile: state.profile,
})

export default connect(mapStateToProps, {
	addLike,
	removeLike,
	startDeletePosts,
})(PostItem)
