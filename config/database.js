const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

// for live to change to this
// mongoose.Promise = global.Promise
// const CONNECTION_URI =
// 	process.env.MONGODB_URI || 'mongodb://localhost:27017/epix'

//for dev
const CONNECTION_URI = db ;

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
			console.log(err,'error')
			console.error(err.Message)
		})
}

module.exports = connectDB
