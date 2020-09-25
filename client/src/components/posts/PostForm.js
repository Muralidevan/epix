import React, { useState, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { startAddPost } from '../../actions/postAction'
import Swal from 'sweetalert2'

const PostForm = ({ startAddPost }) => {
	const initialState = {
		text: '',
		iso: 'auto',
		// thumbnail: '',
		preview: '',
		len: '',
		apperture: 'auto',
		shutterspeed: 'auto',
		imgsrc: '',
	}
	const [formData, setFormData] = useState(initialState)

	const {
		text,
		iso,
		apperture,
		shutterspeed,
		imgsrc,
		preview,
		len,
		// thumbnail,
	} = formData

	const handleChange = (e) => {
		// e.preventDefault()

		const file = e.target.files[0]

		const picLen = e.target.files.length

		if (e.target.files && e.target.files[0]) {
			let reader = new FileReader()
			reader.onload = (e) => {
				setFormData({
					len: picLen,
					imgsrc: file,
					// thumbnail: file,
					preview: URL.createObjectURL(file),
				})
			}
			reader.readAsDataURL(e.target.files[0])
		}
	}
	//console.log(profilePic)
	const onChange = (e) => {
		// e.preventDefault()

		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleClick = () => {
		Swal.fire({
			text: 'Please Choose a File ',
			showConfirmButton: false,
			icon: 'info',
			toast: true,
			timer: 2000,
			position: 'top',
		})
	}

	const onSubmit = (e) => {
		e.preventDefault()
		let form = new FormData()

		form.append('imgsrc', imgsrc)
		// form.append('thumbnail', thumbnail)
		form.append('iso', iso)
		form.append('apperture', apperture)
		form.append('shutterspeed', shutterspeed)
		form.append('text', text)

		// for (const [key, value] of form) {
		// 	console.log('values', key, value)
		// }
		startAddPost(form)
	}

	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Create Your Post...</h3>
			</div>
			<form className='form' onSubmit={onSubmit} id='form'>
				<div className='form-group'>
					{len && (
						<Fragment>
							<img
								className='post-pic  '
								src={preview}
								alt='preview'
								id='target-new'
							/>
							<p className='lead'>
								<i className='fas fa-code-branch' />
								Image Preview
							</p>
						</Fragment>
					)}
				</div>
				<div className='form-group'>
					<input
						type='file'
						id='file'
						onChange={handleChange}
						accept='image/*'
						encType='multipart/form-data'
					/>{' '}
				</div>
				<div className='form-group-profile'>
					<Fragment>
						<select name='iso' value={iso} onChange={onChange} required>
							<option value=''> Iso</option>
							<option value='Auto'>Auto</option>
							<option value='L(50)'>L(50)</option>
							<option value='100'>100</option>
							<option value='125'>125</option>
							<option value='160'>160</option>
							<option value='200'>200</option>
							<option value='250'>250</option>
							<option value='320'>320</option>
							<option value='400'>400</option>
							<option value='500'>500</option>
							<option value='640'>640</option>
							<option value='800'>800</option>
							<option value='1000'>1000</option>
							<option value='1250'>1250</option>
							<option value='1600'>1600</option>
							<option value='2000'>2000</option>
							<option value='2500'>2500</option>
							<option value='3200'>3200</option>
							<option value='4000'>4000</option>
							<option value='5000'>5000</option>
							<option value='6400'>6400</option>
							<option value='8000'>8000</option>
							<option value='10000'>10000</option>
							<option value='12800'>12800</option>
							<option value='16000'>16000</option>
							<option value='20000'>20000</option>
							<option value='25600'>25600</option>
							<option value='H1(51200)'>H1(51200)</option>
							<option value='H2(102400)'>H2(102400)</option>
						</select>
					</Fragment>
					<Fragment>
						<select
							name='apperture'
							value={apperture}
							onChange={onChange}
							required
						>
							<option value=''> Apperture</option>
							<option value='Auto'>Auto</option>
							<option value='1.0'>1.0</option>
							<option value='1.1'>1.1</option>
							<option value='1.2'>1.2</option>
							<option value='1.4'>1.4</option>
							<option value='1.6'>1.6</option>
							<option value='1.8'>1.8</option>
							<option value='2.0'>2.0</option>
							<option value='2.2'>2.2</option>
							<option value='2.4'>2.4</option>
							<option value='2.8'>2.8</option>
							<option value='3.2'>3.2</option>
							<option value='3.5'>3.5</option>
							<option value='4'>4</option>
							<option value='4.5'>1.5</option>
							<option value='5'>5</option>
							<option value='5.6'>5.6</option>
							<option value='6.3'>6.3</option>
							<option value='7.1'>7.1</option>
							<option value='8'>8</option>
							<option value='9'>9</option>
							<option value='10'>10</option>
							<option value='11'>11</option>
							<option value='13'>13</option>
							<option value='14'>14</option>
							<option value='16'>16</option>
							<option value='18'>18</option>
							<option value='22'>22</option>
						</select>
					</Fragment>
					<Fragment>
						<select
							name='shutterspeed'
							value={shutterspeed}
							onChange={onChange}
							required
						>
							<option value=''> Shutter Speed</option>
							<option value='Auto'>Auto</option>
							<option value='1/8000'>1/8000</option>
							<option value='1/6400'>1/6400</option>
							<option value='1/5000'>1/5000</option>
							<option value='1/4000'>1/4000</option>
							<option value='1/3200'>1/3200</option>
							<option value='1/2500'>1/2500</option>
							<option value='1/2000'>1/2000</option>
							<option value='1/1600'>1/1600</option>
							<option value='1/1250'>1/1250</option>
							<option value='1/1000'>1/1000</option>
							<option value='1/800'>1/800</option>
							<option value='1/640'>1/640</option>
							<option value='1/500'>1/500</option>
							<option value='1/400'>1/400</option>
							<option value='1/320'>1/320</option>
							<option value='1/250'>1/250</option>
							<option value='1/200'>1/200</option>
							<option value='1/160'>1/160</option>
							<option value='1/125'>1/125</option>
							<option value='1/100'>1/100</option>
							<option value='1/80'>1/80</option>
							<option value='1/60'>1/60</option>
							<option value='1/50'>1/50</option>
							<option value='1/40'>1/40</option>
							<option value='1/30'>1/30</option>
							<option value='1/25'>1/25</option>
							<option value='1/20'>1/20</option>
							<option value='1/15'>1/15</option>
						</select>
					</Fragment>
				</div>
				<div className='form-group'>
					<textarea
						name='text'
						cols='30'
						rows='3'
						placeholder='Write Something About Your Image'
						value={text}
						onChange={onChange}
						required
						style={{ width: '61%' }}
					/>
					<p className='lead-note'>
						<i className='fa fa-exclamation-triangle' /> Note: Create Your
						Profile To Upload
					</p>
					{len ? (
						<input
							type='submit'
							className='btn btn-dark my-1'
							value='Submit'
							style={{ margin: '0,1rem', display: 'block' }}
						/>
					) : (
						<button
							onClick={handleClick}
							type='button'
							className='btn btn-dark my-1'
						>
							Submit
						</button>
					)}
				</div>
			</form>
		</div>
	)
}

PostForm.propTypes = {
	startAddPost: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
	profile: state.profile,
})

export default connect(mapStateToProps, { startAddPost })(PostForm)
