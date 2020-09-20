const multer = require('multer')

const path = require('path')

function checkFileType(file, cb) {
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
	// Check mime
	const mimetype = filetypes.test(file.mimetype)

	if (mimetype && extname) {
		return cb(null, true)
	} else {
		cb('Error: Images Only!')
	}
}

const multerConf = {
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, './public/uploads')
		},
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + '-' + Date.now() + path.extname(file.originalname)
			)
			//console.log(file)
		},
	}),
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb)
	},
}

module.exports = multerConf
