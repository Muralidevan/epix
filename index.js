const express = require('express')

const connectDB = require('./config/database')

const router = require('./config/routes')
const path = require('path')

const app = express()

// var cors = require('cors')

//connect Database
// app.use(cors())
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use('/public', express.static('public'))

//serve static assests in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

const PORT = process.env.PORT || 3055

app.listen(PORT, () => {
	console.log('server running successfully on Port', PORT)
})
