import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Gallery from 'react-grid-gallery'
import { getPosts } from '../../actions/postAction'

const Album = ({ getPosts, post: { posts }, match }) => {
	useEffect(() => {
		getPosts()
	}, [getPosts])

	let IMAGES = [
		{
			src:
				'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			thumbnail:
				'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',

			thumbnailWidth: 500,
			thumbnailHeight: 350,

			caption: 'Gallery',
		},
	]

	let GlobIMAGES = [
		{
			src:
				'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
			thumbnail:
				'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',

			thumbnailWidth: 500,
			thumbnailHeight: 350,

			caption: 'Gallery',
		},
	]

	let src

	posts
		.filter((ele) => ele.user === match.params.id)
		.map((ele) => {
			src = ele.imgsrc
			const thumbnail = ele.imgsrc
			const caption = ele.text

			// console.log(typeof src[0])
			// arr.splice(index, 0, item);
			IMAGES.push({
				src: src,
				thumbnail: thumbnail,
				thumbnailWidth: 500,
				thumbnailHeight: 350,

				caption,
			})
			return IMAGES
		})
	let gsrc

	posts
		.filter((ele) => ele.user !== match.params.id)
		.map((ele) => {
			gsrc = ele.imgsrc
			const thumbnail = ele.imgsrc
			const caption = ele.text

			// console.log(typeof src[0])
			// arr.splice(index, 0, item);
			GlobIMAGES.push({
				src: gsrc,
				thumbnail: thumbnail,
				thumbnailWidth: 500,
				thumbnailHeight: 350,

				caption,
			})
			return IMAGES
		})

	// console.log(IMAGES)

	return (
		<Fragment>
			<h1 className='large text-primary' style={{ textAlign: 'center' }}>
				EPIX&nbsp;&nbsp;<i className='fa fa-camera' aria-hidden='true'></i>
				&nbsp; GALLERY
			</h1>
			<div className='bg-gallery p'>
				<h3>Photos Clicked By You...</h3>
			</div>

			<br />
			<div className='gallery'>
				<div className='gallery-group'>
					<Gallery
						images={IMAGES}
						// enableLightbox={true}
						alt='not found'
						enableImageSelection={false}
					/>
				</div>
			</div>
			<Fragment>
				<br />
				<div className='bg-gallery p'>
					<h3>Photos Clicked By Other PhotoGraphers...</h3>
				</div>

				<br />
				<div className='gallery'>
					<div className='gallery-group'>
						<Gallery
							images={GlobIMAGES}
							alt='not found'
							// enableLightbox={true}
							enableImageSelection={false}
						/>
					</div>
				</div>
			</Fragment>
		</Fragment>
	)
}

Album.propTypes = {
	post: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	post: state.post,
})

export default withRouter(connect(mapStateToProps, { getPosts })(Album))
