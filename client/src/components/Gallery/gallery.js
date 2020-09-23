import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import Gallery from 'react-photo-gallery'
import Gallery from 'react-grid-gallery'

// import Carousel, { Modal, ModalGateway } from 'react-images'
import { getPosts } from '../../actions/postAction'

const Album = ({ getPosts, post: { posts } }) => {
	// const [currentImage, setCurrentImage] = useState(0)
	// const [viewerIsOpen, setViewerIsOpen] = useState(false)

	useEffect(() => {
		getPosts()
	}, [getPosts])

	// const openLightbox = useCallback((event, { photo, index }) => {
	// 	setCurrentImage(index)
	// 	setViewerIsOpen(true)
	// }, [])

	// const closeLightbox = () => {
	// 	setCurrentImage(0)
	// 	setViewerIsOpen(false)
	// }
	// const onCurrentImageChange=(index) =>{
	//     this.setState({ currentImage: index });
	// }
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
	let src
	posts.map((ele) => {
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
	// console.log(IMAGES)

	return (
		<Fragment>
			<h1 className='large text-primary' style={{ textAlign: 'center' }}>
				EPIX&nbsp;&nbsp;<i className='fa fa-camera' aria-hidden='true'></i>
				&nbsp; GALLERY
			</h1>
			<div className='gallery'>
				<div className='gallery-group'>
					<Gallery
						images={IMAGES}
						// alt='Image Not Found'

						// enableLightbox={true}
						enableImageSelection={false}
					/>
				</div>
			</div>
			{/* <ModalGateway>
				{viewerIsOpen ? (
					<Modal onClose={closeLightbox}>
						<Carousel
							currentIndex={currentImage}
							views={IMAGES.map((x) => ({
								...x,
								srcset: x.srcSet,
								caption: x.title,
							}))}
						/>
					</Modal>
				) : null}
			</ModalGateway> */}
		</Fragment>
	)
}
// render(<gallery />, document.getElementById('app'))

Album.propTypes = {
	post: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
	post: state.post,
})

export default connect(mapStateToProps, { getPosts })(Album)
