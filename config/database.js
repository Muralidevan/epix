const mongoose = require('mongoose')
const config = require('config')

const db = config.get('mongoURI')
mongoose.Promise = global.Promise
// const CONNECTION_URI = process.env.MONGODB_URI || db

const connectDB = () => {
	mongoose
		.connect(db, {
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

			process.exit(1)
		})
}

module.exports = connectDB
