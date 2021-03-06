const mongoose = require('mongoose')
// const config = require('config')

// const db = config.get('mongoURI')

mongoose.Promise = global.Promise
const CONNECTION_URI =
	process.env.MONGODB_URI || 'mongodb://localhost:27017/epix'

const connectDB = () => {
	mongoose
		.connect(CONNECTION_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('connected to Db successfully')
		})
		.catch((err) => {
			console.error(err.Message)
		})
}

module.exports = connectDB
