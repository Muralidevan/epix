const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')

const connectDB = () => {
	mongoose
		.connect('mongodb://localhost:27017/epix', {
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
			//exit process with failure
			process.exit(1)
		})
}

module.exports = connectDB
